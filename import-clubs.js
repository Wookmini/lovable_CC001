import xlsx from 'xlsx';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://peftdzpmxrrxofpxvbrc.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SERVICE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ SERVICE_KEY 환경 변수가 설정되지 않았습니다.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runImport() {
  console.log("엑셀 파일 읽는 중...");
  const workbook = xlsx.readFile('(급여공제)사내동호회_260608.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  
  // 데이터 행 추출 (구분, 동호회명, 사번, 성명, 금액, 비고)
  // 인덱스 1이 동호회명, 2가 사번, 3이 성명, 5가 비고
  const dataRows = rows.slice(2).filter(r => r[1] && r[3]); // 동호회명과 성명이 있는 행만
  
  console.log(`총 ${dataRows.length}개의 가입 내역이 확인되었습니다.\n`);

  // 1. 프로필 목록 가져오기 (매칭용)
  const { data: profiles, error: profileErr } = await supabase.from('profiles').select('*');
  if (profileErr) {
    console.error("프로필을 불러오는 데 실패했습니다:", profileErr.message);
    return;
  }
  
  console.log(`DB에서 ${profiles.length}명의 프로필을 불러왔습니다.`);

  // 2. 고유 동호회 목록 추출 및 clubs 테이블에 삽입
  const clubNames = [...new Set(dataRows.map(r => String(r[1]).trim()))];
  console.log(`\n발견된 동호회 (${clubNames.length}개):`, clubNames.join(', '));
  
  const clubsMap = {}; // name -> id
  
  for (const cName of clubNames) {
    // 이미 있는지 확인
    let { data: existingClub } = await supabase.from('clubs').select('id').eq('name', cName).single();
    
    if (!existingClub) {
      // 없으면 생성
      const { data: newClub, error: insertErr } = await supabase.from('clubs').insert([{ name: cName }]).select('id').single();
      if (insertErr) {
        console.error(`동호회 '${cName}' 생성 실패:`, insertErr.message);
        continue;
      }
      existingClub = newClub;
      console.log(`✨ 동호회 '${cName}' 테이블에 추가됨`);
    }
    clubsMap[cName] = existingClub.id;
  }

  // 3. club_members 데이터 삽입
  let successCount = 0;
  let failCount = 0;
  
  // 기존 가입내역 전부 삭제 후 다시 엎어쓰기 할 수도 있지만, 일단은 추가만.
  
  for (const row of dataRows) {
    const cName = String(row[1]).trim();
    const empId = row[2] ? String(row[2]).trim() : null;
    const empName = String(row[3]).trim();
    
    // 프로필 찾기
    let matchedProfile = null;
    if (empId) {
      matchedProfile = profiles.find(p => p.employee_id === empId);
    }
    if (!matchedProfile) {
      // 사번이 없거나 안 맞으면 이름으로 매칭
      const matchedByName = profiles.filter(p => p.full_name === empName);
      if (matchedByName.length === 1) {
        matchedProfile = matchedByName[0];
      } else if (matchedByName.length > 1) {
        console.log(`⚠️ 경고: '${empName}' 이름이 여러 명 있습니다. 자동 매칭 실패.`);
      }
    }
    
    if (!matchedProfile) {
      console.log(`❌ 실패: '${empName}' (${empId || '사번없음'}) - DB에서 프로필을 찾을 수 없습니다.`);
      failCount++;
      continue;
    }
    
    // 역할 확인 (비고란에 '회장' 또는 '총무'가 있는지)
    const remark = row[5] ? String(row[5]) : '';
    let role = 'member';
    if (remark.includes('회장')) role = 'president';
    else if (remark.includes('총무')) role = 'manager';
    
    // 이미 가입되어 있는지 확인
    const { data: existingMember } = await supabase
      .from('club_members')
      .select('id')
      .eq('profile_id', matchedProfile.id)
      .eq('club_name', cName)
      .maybeSingle();
      
    if (!existingMember) {
      const { error: memberErr } = await supabase.from('club_members').insert([
        {
          profile_id: matchedProfile.id,
          club_name: cName,
          role: role
        }
      ]);
      
      if (memberErr) {
        console.log(`❌ 실패: '${empName}' ${cName} 가입 실패 - ${memberErr.message}`);
        failCount++;
      } else {
        successCount++;
        // 만약 회장/총무면 clubs 테이블에도 업데이트
        if (role === 'president') {
          await supabase.from('clubs').update({ president_id: matchedProfile.employee_id }).eq('name', cName);
        } else if (role === 'manager') {
          await supabase.from('clubs').update({ secretary_id: matchedProfile.employee_id }).eq('name', cName);
        }
      }
    } else {
      console.log(`⚠️ 건너뜀: '${empName}' 님은 이미 ${cName}에 가입되어 있습니다.`);
      // Update role just in case
      if (role !== 'member') {
          await supabase.from('club_members').update({role}).eq('id', existingMember.id);
          if (role === 'president') await supabase.from('clubs').update({ president_id: matchedProfile.employee_id }).eq('name', cName);
          else if (role === 'manager') await supabase.from('clubs').update({ secretary_id: matchedProfile.employee_id }).eq('name', cName);
      }
    }
  }

  console.log(`\n🎉 업로드 완료! (성공: ${successCount}, 실패: ${failCount})`);
}

runImport();
