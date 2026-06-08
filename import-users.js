import xlsx from 'xlsx';
import { createClient } from '@supabase/supabase-js';

// 이 스크립트를 실행할 때 명령줄에서 키를 받아옵니다.
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
  const workbook = xlsx.readFile('인원명부260608.XLSX');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(worksheet);

  console.log(`총 ${rows.length}명의 데이터가 확인되었습니다. 업로드를 시작합니다...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    const empId = String(row['사원번호']).trim();
    const name = String(row['이름']).trim();
    const dept = String(row['조직명']).trim();
    
    // 생년월일 8자리 -> 6자리 변환 (예: 19820318 -> 820318)
    let rawBirth = String(row['생년월일']).trim();
    let password = rawBirth;
    if (rawBirth.length === 8) {
      password = rawBirth.substring(2); // 앞의 '19' 또는 '20' 제외
    }

    const email = `${empId}@dbglobalchip.local`;

    try {
      // 1. auth.users 에 계정 생성
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true // 이메일 인증 통과 처리
      });

      if (authError) {
        if (authError.message.includes('already exists')) {
          console.log(`⚠️ 건너뜀: ${name} (${empId}) - 이미 가입된 사원입니다.`);
        } else {
          console.error(`❌ 에러: ${name} (${empId}) 계정 생성 실패 -`, authError.message);
          errorCount++;
        }
        continue;
      }

      const userId = authData.user.id;

      // 2. profiles 에 프로필 정보 삽입
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: userId,
          employee_id: empId,
          full_name: name,
          department: dept
        }
      ]);

      if (profileError) {
        console.error(`❌ 에러: ${name} (${empId}) 프로필 생성 실패 -`, profileError.message);
        errorCount++;
      } else {
        successCount++;
        if (successCount % 10 === 0) {
          console.log(`✅ ${successCount}명 업로드 완료...`);
        }
      }
    } catch (err) {
      console.error(`❌ 예상치 못한 에러: ${name} (${empId}) -`, err.message);
      errorCount++;
    }
  }

  console.log(`\n🎉 모든 작업이 끝났습니다!`);
  console.log(`- 성공: ${successCount}명`);
  console.log(`- 실패: ${errorCount}명`);
}

runImport();
