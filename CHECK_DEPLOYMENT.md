# GitHub Actions 자동 배포 확인 방법

## 1. GitHub 저장소에서 확인

### Actions 탭 확인
1. GitHub 저장소 페이지로 이동: https://github.com/witchshin/blog
2. 상단 메뉴에서 **Actions** 탭 클릭
3. 왼쪽 사이드바에서 **Deploy to GitHub Pages** 워크플로우 클릭
4. 최근 실행된 워크플로우 목록이 표시됩니다

### 배포 상태 확인
- 🟢 **녹색 체크**: 배포 성공
- 🟡 **노란색 원**: 배포 진행 중
- 🔴 **빨간색 X**: 배포 실패

### 배포 로그 확인
1. 워크플로우 실행 항목 클릭
2. 왼쪽에서 **deploy** 작업 클릭
3. 각 단계를 클릭하여 상세 로그 확인:
   - ✅ Checkout
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build
   - ✅ Setup Pages
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

## 2. 배포 완료 확인

### 배포 URL 확인
배포가 성공하면:
- **Actions** 탭의 워크플로우 실행 페이지에서
- 오른쪽 상단에 **View deployment** 버튼이 표시됩니다
- 또는 직접 접속: https://witchshin.github.io/blog/

### Pages 설정 확인
1. **Settings** → **Pages**로 이동
2. **Custom domain** 섹션 아래에 배포 상태가 표시됩니다
3. "Your site is live at https://witchshin.github.io/blog/" 메시지 확인

## 3. 문제 해결

### 배포가 실패하는 경우
1. **Actions** 탭에서 실패한 워크플로우 클릭
2. 빨간색 X가 표시된 단계 클릭
3. 로그를 확인하여 오류 원인 파악
4. 일반적인 오류:
   - 빌드 오류: `npm run build` 실패
   - 권한 오류: Pages 권한 설정 확인
   - 경로 오류: `vite.config.ts`의 `base` 설정 확인

### 배포가 시작되지 않는 경우
- `main` 브랜치에 푸시했는지 확인
- `.github/workflows/deploy.yml` 파일이 올바른지 확인
- GitHub Pages 설정에서 Source가 "GitHub Actions"로 설정되어 있는지 확인

## 4. 로컬에서 배포 테스트

배포 전에 로컬에서 빌드 테스트:

```bash
npm run build
npm run preview
```

빌드가 성공하면 `dist` 폴더가 생성되고, `preview` 명령어로 로컬에서 확인할 수 있습니다.

