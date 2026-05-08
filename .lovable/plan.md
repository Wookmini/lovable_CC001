
# DBG 동호회 모바일 앱 UI 키트

세이지 & 크림 파스텔 팔레트 + 글래스모피즘으로 구성한 멀티스크린 모바일 앱 프로토타입을 TanStack Start 기반으로 구현합니다. 모바일 뷰포트(375px)에 최적화된 디바이스 프레임 안에서 모든 화면을 탐색할 수 있도록 만듭니다.

## 디자인 시스템

**컬러 토큰** (`src/styles.css` — oklch 형식)
- Background: `#f5f0e8` (warm cream)
- Surface: `#ffffff` 위 글래스 레이어 (반투명 + backdrop-blur)
- Muted: `#dce5d4` (pale sage)
- Primary: `#7d9b76` (deep sage) / Primary-glow: `#a8c0a0`
- Accent gradients: sage→cream, sage-glow→peach 보조
- 부드러운 그림자: `--shadow-soft`, `--shadow-glow` (sage 30% 블렌드)

**타이포그래피**
- Heading: Urbanist (600/700)
- Body: Epilogue (400/500)
- Google Fonts로 styles.css에서 import

**UI 원칙**
- Border radius: 24–32px (카드), 16px (버튼), full (칩)
- 글래스: `bg-white/40 backdrop-blur-xl border border-white/60`
- 그라데이션 배경: 코너 블롭 + 부드러운 mesh
- 매끄러운 마이크로 인터랙션 (hover, tap scale)

## 화면 구성 (7개)

1. **Onboarding** (`/`) — 3-step 스와이프 가능한 인트로 + DBG 로고 + "시작하기" CTA
2. **로그인/가입** (`/auth`) — 글래스 카드 폼
3. **홈 대시보드** (`/home`) — 인사말, 다가오는 모임 캐러셀, 빠른 액션, 최근 활동
4. **회원 리스트** (`/members`) — 검색 바 + 칩 필터 + 아바타 그리드/리스트 카드
5. **이벤트/일정** (`/events`) — 미니 캘린더 + 모임 카드 리스트 + RSVP 상태
6. **채팅/공지** (`/chat`) — 공지 핀 + 채팅방 리스트 + 안 읽음 배지
7. **갤러리/활동 피드** (`/gallery`) — 마손리 그리드 사진 피드 + 좋아요/댓글
8. **프로필** (`/profile`) — 커버 + 아바타 + 통계 + 활동 배지
9. **설정** (`/settings`) — 토글, 테마, 알림, 언어, 로그아웃

## 네비게이션

- **모바일 디바이스 프레임 셸** (`__root.tsx`): 데스크톱에서도 가운데 375px 폰 목업으로 보여주고, 모바일에서는 풀스크린.
- **하단 탭바** (글래스 모피즘): 홈 / 회원 / 이벤트 / 채팅 / 프로필
- 갤러리 + 설정은 홈/프로필에서 접근

## 기술 구현

- TanStack Router 파일 기반 라우팅 — 각 화면을 `src/routes/{name}.tsx`로 분리
- 공유 레이아웃: `src/routes/_app.tsx` (디바이스 프레임 + 하단 탭바, `<Outlet />`)
- 컴포넌트: `src/components/`
  - `PhoneFrame.tsx` (디바이스 목업)
  - `BottomTabBar.tsx`
  - `GlassCard.tsx`, `MemberCard.tsx`, `EventCard.tsx`, `ChatRow.tsx`
  - `GradientBlob.tsx` (배경 장식)
- 더미 데이터: `src/lib/mock-data.ts` (회원, 이벤트, 채팅, 사진)
- 사진은 unsplash placeholder URL 사용
- 각 라우트는 고유 `head()` 메타 (title/description)

## 산출물

데스크톱: 폰 목업 + 화면 라벨 갤러리 / 모바일: 풀스크린 인터랙티브 앱. 모든 화면을 탭바로 자유롭게 이동 가능합니다.
