export const CLUBS_DATA = [
  { name: '⚽️ FC DBG', presidentId: 1, secretaryId: 3 },
  { name: '💻 알고리즘', presidentId: 2, secretaryId: null },
  { name: '📚 북클럽', presidentId: 4, secretaryId: null },
  { name: '🍷 와인사랑', presidentId: 2, secretaryId: null },
  { name: '🏕 캠핑부', presidentId: 5, secretaryId: null },
  { name: '🏃 러닝크루', presidentId: 3, secretaryId: null },
  { name: '🎨 드로잉', presidentId: 4, secretaryId: null },
  { name: '📸 포토그래피', presidentId: 4, secretaryId: null },
];

export const MEMBERS_DATA = [
  { id: 1, name: '김태형', dept: '개발 1팀', clubs: ['⚽️ FC DBG', '💻 알고리즘'], avatar: 'https://i.pravatar.cc/150?img=12', role: 'president', status: 'online' },
  { id: 2, name: '이지은', dept: '마케팅팀', clubs: ['📚 북클럽', '🍷 와인사랑', '💻 알고리즘'], avatar: 'https://i.pravatar.cc/150?img=47', role: 'user', status: 'online' },
  { id: 3, name: '박지성', dept: '영업본부', clubs: ['⚽️ FC DBG', '🏃 러닝크루'], avatar: 'https://i.pravatar.cc/150?img=33', role: 'user', status: 'away' },
  { id: 4, name: '최유리', dept: '디자인팀', clubs: ['🎨 드로잉', '📸 포토그래피', '📚 북클럽'], avatar: 'https://i.pravatar.cc/150?img=45', role: 'user', status: 'online' },
  { id: 5, name: '정민수', dept: '인사팀', clubs: ['🏕 캠핑부'], avatar: 'https://i.pravatar.cc/150?img=15', role: 'admin', status: 'offline' },
];

export const POSTS_DATA = [
  { id: 1, club: '⚽️ FC DBG', category: '활동보고서', title: '5월 정기 친선 매치 결과 보고', content: '이번 달 풋살 친선 매치 결과 보고드립니다. 상대팀은 마케팅 연합팀이었으며 5:3으로 승리했습니다! 참여해주신 모든 분들 고생 많으셨습니다.', author: '김태형', time: '2시간 전', likes: 12, comments: 5, budget: '구장 대관료: 120,000원\n음료 및 간식: 35,000원\n총 155,000원 지출' },
  { id: 2, club: '💻 알고리즘', category: '회원 게시판', title: '이번 주차 스터디 문제 공유합니다', content: '프로그래머스 DP 문제 위주로 3문제 선정했습니다. 미리 풀어오시면 됩니다. 질문은 언제든 환영입니다.', author: '이지은', time: '5시간 전', likes: 8, comments: 2, budget: null },
  { id: 3, club: '⚽️ FC DBG', category: '회원 게시판', title: '안녕하세요! 새로 가입했습니다.', content: '축구를 좋아해서 가입하게 되었습니다. 포지션은 윙어입니다. 잘 부탁드립니다~', author: '박지성', time: '1일 전', likes: 15, comments: 8, budget: null },
  { id: 4, club: '📚 북클럽', category: '행사 승인신청서', title: '하반기 저자 초청 북토크 행사 신청', content: '트렌드 코리아 저자분을 초청하여 사내 북토크 행사를 기획하고자 합니다. 외부 인원 초청에 따른 예산 승인 요청드립니다.', author: '최유리', time: '2일 전', likes: 20, comments: 11, budget: '강연료: 500,000원\n다과비: 100,000원\n총 600,000원 승인 요청' },
];

// 기존 lovable_CC001의 추가 Mock 데이터들 유지
export const events = [
  { id: "e1", title: "한강 야간 러닝", date: "5월 12일 화", time: "19:30", place: "반포한강공원", attendees: 14, team: "🏃 러닝크루", color: "from-emerald-200 to-teal-100" },
  { id: "e2", title: "월간 독서 모임", date: "5월 15일 금", time: "20:00", place: "성수 북카페", attendees: 8, team: "📚 북클럽", color: "from-amber-100 to-orange-100" },
  { id: "e3", title: "북한산 주말 산행", date: "5월 18일 일", time: "07:00", place: "북한산 우이역", attendees: 22, team: "🏕 캠핑부", color: "from-lime-100 to-green-200" },
  { id: "e4", title: "출사 — 서촌 골목", date: "5월 22일 목", time: "16:00", place: "경복궁역 3번 출구", attendees: 6, team: "📸 포토그래피", color: "from-rose-100 to-amber-100" },
];

export const chats = [
  { id: "c1", name: "📢 전체 공지", last: "5월 워크샵 일정 확정되었습니다.", time: "방금", unread: 2, pinned: true, avatar: "" },
  { id: "c2", name: "러닝크루", last: "태형: 내일 비 오면 어떡해요?", time: "10분", unread: 5, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "c3", name: "북클럽", last: "지은: 다음 책 후보 올려뒀어요 📚", time: "1시간", unread: 0, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "c4", name: "캠핑부", last: "지성: 텐트 사진 너무 잘 나왔네요!", time: "어제", unread: 0, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: "c5", name: "포토그래피", last: "유리: 출사 장소 변경 공지", time: "2일", unread: 1, avatar: "https://i.pravatar.cc/150?img=45" },
];

export const gallery = [
  { id: "g1", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600", h: 220, likes: 42, by: "김태형" },
  { id: "g2", url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600", h: 280, likes: 31, by: "박지성" },
  { id: "g3", url: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=600", h: 180, likes: 18, by: "최유리" },
  { id: "g4", url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600", h: 240, likes: 56, by: "이지은" },
  { id: "g5", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", h: 200, likes: 27, by: "정민수" },
];

export const profile = {
  name: "김태형",
  handle: "@taehyung",
  role: "회장 · ⚽️ FC DBG",
  bio: "함께 뛰고 땀흘리며 성장합시다 🏃‍♂️",
  cover: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900",
  avatar: "https://i.pravatar.cc/200?img=12",
  stats: { events: 28, posts: 64, friends: 132 },
  badges: ["🏃 러닝 100km", "⚽ 득점왕", "🏆 챔피언"],
};
