# 📱 DB글로벌칩 사내 동호회 커뮤니티 앱

> **DB글로벌칩 임직원들을 위한 모바일 중심 사내 동호회 커뮤니티 플랫폼**입니다.  
> 모임 일정(RSVP), 회원 관리, 사진첩(갤러리), 실시간 채팅 등 동호회 활동에 필요한 모든 것을 한 곳에서 쉽고 빠르게 소통하며 기록할 수 있습니다.

---

## 🌐 Live Demo
* **배포 주소:** [https://dbg-club-test.jeong16051303.workers.dev/home](https://dbg-club-test.jeong16051303.workers.dev/home)
* Cloudflare Pages를 통한 자동 배포 환경 구성 완료 (자세한 내용은 `cloudflare_deployment_guide.md` 참고)

---

## 🎨 주요 화면 및 기능

*   **✨ 인터랙티브 온보딩 (Onboarding)**
    *   사내 동호회 서비스의 주요 강점(네트워킹, 모임 관리, 추억 공유)을 매끄러운 슬라이드 트랜지션 애니메이션과 함께 직관적으로 전달합니다.
*   **🔒 보안 로그인 및 인증 (Authentication)**
    *   임직원 사원번호 및 생년월일을 활용한 간편 로그인 방식을 지원합니다.
    *   사내 SSO 연동 및 게스트 로그인 등 유연한 접근 경로를 제공합니다.
*   **🏠 홈 대시보드 (Home Dashboard)**
    *   이번 주 예정된 주요 모임 정보(한강 야간 러닝 등)와 RSVP 참여 현황을 한눈에 제공합니다.
    *   일정, 회원, 갤러리, 설정 등 주요 메뉴로 즉시 이동 가능한 퀵 액션 카드 및 최근 활동 갤러리를 피드 형태로 보여줍니다.
*   **📅 모임 일정 관리 (Events)**
    *   동호회 및 관심 팀별 다가오는 모임 일정 확인 및 참여 상태(RSVP) 관리가 가능합니다.
*   **👥 회원 디렉토리 (Members)**
    *   동호회에 소속된 사우들의 프로필 이미지, 소속 부서 등의 리스트를 탐색할 수 있습니다.
*   **🖼️ 사진첩 및 기록 (Gallery)**
    *   동호회 활동의 생생한 현장 사진과 소중한 추억들을 기록하고 함께 공유합니다.
*   **⚙️ 서비스 설정 (Settings)**
    *   앱 다크모드, 알림 주기, 개인 프로필 관리 등의 맞춤 설정을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

*   **Core**: React 19, TypeScript
*   **Framework / Routing**: TanStack Start (React Router v1 + Server Functions + Vite Plugin)
*   **Styling**: Tailwind CSS v4, Vanilla CSS (Glassmorphism, Gradient UI)
*   **Icons**: Lucide React
*   **Build Tool**: Vite

---

## 📝 업데이트 누적 이력 (Update & Push History)

각 릴리즈 및 깃허브 푸쉬(Push) 시 업데이트 이력을 누적하여 기록 및 관리합니다.

| 버전/일자 | 주요 업데이트 내역 | 작성자 | 비고 |
| :--- | :--- | :--- | :--- |
| **`2026-05-27`** | **[2nd Push] 온보딩, 로그인 및 홈 대시보드 동적 기능 연동**<br>• `AppContext`에 `hasSeenOnboarding` 및 `isLoggedIn` 전역 상태 추가<br>• 온보딩 완료 시 `/auth` 리다이렉트 및 로그인 폼 상태 연동<br>• 비로그인 유저의 `/home` 등 내부 페이지 접근 차단 (보안 라우팅 적용)<br>• 홈 대시보드 메인 모임 카드에 RSVP(참여) 버튼 동적 상태 토글 및 인원수 실시간 카운팅 반영 | wookmini | |
| **`2026-05-19`** | **[1st Push] 초기 프로젝트 구축 및 모바일 UI 기본 뼈대 수립**<br>• TanStack Start 기반의 사내 동호회 프로젝트 아키텍처 구성<br>• 모바일 전용 컨테이너 `PhoneFrame` 및 미려한 백그라운드 `GradientBlob` 컴포넌트 구현<br>• 온보딩(슬라이더), 로그인(Glassmorphism UI), 홈 대시보드 구조화 완료<br>• 일정(Events), 멤버(Members), 사진첩(Gallery) 등 코어 라우트 레이아웃 설계 | wookmini | Initial Commit |

---

## 🚀 시작하기

### 1. 패키지 설치
```bash
bun install
# 또는
npm install
```

### 2. 로컬 개발 서버 실행
```bash
bun run dev
# 또는
npm run dev
```
