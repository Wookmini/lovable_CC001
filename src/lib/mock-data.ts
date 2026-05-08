export const members = [
  { id: "1", name: "김민준", role: "회장", team: "러닝", avatar: "https://i.pravatar.cc/150?img=12", status: "online" },
  { id: "2", name: "이서연", role: "총무", team: "독서", avatar: "https://i.pravatar.cc/150?img=47", status: "online" },
  { id: "3", name: "박지호", role: "회원", team: "등산", avatar: "https://i.pravatar.cc/150?img=33", status: "away" },
  { id: "4", name: "정유나", role: "회원", team: "사진", avatar: "https://i.pravatar.cc/150?img=45", status: "online" },
  { id: "5", name: "최도현", role: "회원", team: "러닝", avatar: "https://i.pravatar.cc/150?img=15", status: "offline" },
  { id: "6", name: "강하늘", role: "회원", team: "요가", avatar: "https://i.pravatar.cc/150?img=49", status: "online" },
  { id: "7", name: "윤시우", role: "회원", team: "등산", avatar: "https://i.pravatar.cc/150?img=8", status: "offline" },
  { id: "8", name: "한아린", role: "회원", team: "사진", avatar: "https://i.pravatar.cc/150?img=44", status: "online" },
];

export const events = [
  { id: "e1", title: "한강 야간 러닝", date: "5월 12일 화", time: "19:30", place: "반포한강공원", attendees: 14, team: "러닝", color: "from-emerald-200 to-teal-100" },
  { id: "e2", title: "월간 독서 모임", date: "5월 15일 금", time: "20:00", place: "성수 북카페", attendees: 8, team: "독서", color: "from-amber-100 to-orange-100" },
  { id: "e3", title: "북한산 주말 산행", date: "5월 18일 일", time: "07:00", place: "북한산 우이역", attendees: 22, team: "등산", color: "from-lime-100 to-green-200" },
  { id: "e4", title: "출사 — 서촌 골목", date: "5월 22일 목", time: "16:00", place: "경복궁역 3번 출구", attendees: 6, team: "사진", color: "from-rose-100 to-amber-100" },
];

export const chats = [
  { id: "c1", name: "📢 전체 공지", last: "5월 워크샵 일정 확정되었습니다.", time: "방금", unread: 2, pinned: true, avatar: "" },
  { id: "c2", name: "러닝 크루", last: "민준: 내일 비 오면 어떡해요?", time: "10분", unread: 5, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "c3", name: "독서 모임", last: "서연: 다음 책 후보 올려뒀어요 📚", time: "1시간", unread: 0, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "c4", name: "등산 동호회", last: "지호: 사진 너무 잘 나왔네요!", time: "어제", unread: 0, avatar: "https://i.pravatar.cc/150?img=33" },
  { id: "c5", name: "사진반", last: "유나: 출사 장소 변경 공지", time: "2일", unread: 1, avatar: "https://i.pravatar.cc/150?img=45" },
];

export const gallery = [
  { id: "g1", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600", h: 220, likes: 42, by: "김민준" },
  { id: "g2", url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600", h: 280, likes: 31, by: "박지호" },
  { id: "g3", url: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=600", h: 180, likes: 18, by: "정유나" },
  { id: "g4", url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600", h: 240, likes: 56, by: "이서연" },
  { id: "g5", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600", h: 200, likes: 27, by: "윤시우" },
  { id: "g6", url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600", h: 260, likes: 38, by: "한아린" },
  { id: "g7", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", h: 220, likes: 49, by: "최도현" },
  { id: "g8", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600", h: 190, likes: 22, by: "강하늘" },
];

export const profile = {
  name: "김민준",
  handle: "@minjun",
  role: "회장 · 러닝 크루",
  bio: "달리는 만큼 가까워집니다. 함께 뛰어요 🏃‍♂️",
  cover: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900",
  avatar: "https://i.pravatar.cc/200?img=12",
  stats: { events: 28, posts: 64, friends: 132 },
  badges: ["🏃 러닝 100km", "📚 책벌레", "📸 출사왕", "⛰️ 등산 마스터"],
};
