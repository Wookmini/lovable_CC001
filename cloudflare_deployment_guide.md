# Cloudflare Pages 기반 GitHub 연동 배포 가이드

현재 프로젝트(TanStack Start + SSR 환경)를 가장 빠르고 안정적으로 배포할 수 있는 **Cloudflare Pages** 연동 가이드입니다. 

GitHub 저장소와 한 번만 연결해 두면, 앞으로 GitHub에 코드를 `push`할 때마다 자동으로 최신 버전이 배포됩니다.

---

## 1. Cloudflare 가입 및 로그인
1. [Cloudflare](https://dash.cloudflare.com/sign-up) 웹사이트에 접속하여 계정을 생성하거나 로그인합니다.

## 2. Pages 프로젝트 생성
1. 좌측 사이드바 메뉴에서 **[Workers & Pages]** 를 클릭합니다.
2. 화면 중앙 또는 우측 상단의 **[Create application]** (애플리케이션 생성) 버튼을 누릅니다.
3. 세 개의 탭 중 **[Pages]** 탭을 선택하고 **[Connect to Git]** (Git 연결) 버튼을 클릭합니다.

## 3. GitHub 저장소 연동
1. **Connect to GitHub** 버튼을 눌러 본인의 GitHub 계정을 연동 권한을 허용(Authorize)합니다.
2. 권한 허용 창에서 방금 커밋/푸시한 **`Wookmini/lovable_CC001`** 저장소만 선택하거나, 모든 저장소를 허용합니다.
3. 저장소 목록에서 `lovable_CC001`을 선택하고 **[Begin setup]** 을 누릅니다.

## 4. 빌드 설정 및 배포 (중요)
설정 화면이 나오면 아래와 같이 값을 입력/선택합니다.

> **참고:** Cloudflare가 프로젝트 내의 `wrangler.jsonc` 파일을 감지하면, 일반적인 정적 페이지 빌드 설정 대신 **Workers CI/CD** (풀스택 모드) 설정 화면을 띄워줍니다.

- **Project name:** 원하시는 프로젝트 이름 (예: `dbg-club-test`)
- **Production branch:** `main` (기본값 유지)
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy` (자동으로 입력되어 있습니다)

4. 설정이 맞는지 확인 후 하단의 **[Save and Deploy]** (혹은 **[Deploy]**) 버튼을 클릭합니다.

## 5. 배포 확인
1. 빌드 및 배포 과정이 화면에 로그와 함께 표시됩니다. (보통 1~2분 소요)
2. 배포가 완료되면 화면에 **`https://[프로젝트명].pages.dev`** 혹은 **`https://[프로젝트명].[계정명].workers.dev`** 형태의 무료 도메인 링크가 생성됩니다.
3. 해당 링크로 접속하여 웹 앱이 잘 구동되는지 테스트합니다!

---

> **Tip:** 이제부터는 코드를 수정하고 **GitHub의 `main` 브랜치에 푸시하기만 하면** Cloudflare가 이를 감지하여 자동으로 배포를 업데이트합니다.
