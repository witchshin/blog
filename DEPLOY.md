# GitHub Pages 배포 가이드

## 배포 단계

### 1. GitHub 저장소에 코드 푸시

터미널에서 다음 명령어를 실행하세요:

```bash
git push -u origin main
```

인증이 필요하면 GitHub 사용자명과 Personal Access Token을 입력하세요.

### 2. GitHub Pages 설정

1. GitHub 저장소 페이지로 이동: https://github.com/witchshin/blog
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - **Deploy from a branch** 선택
   - **Branch**를 `main`으로 선택
   - **Folder**를 `/ (root)`로 선택
   - 또는 **GitHub Actions**를 선택 (자동 배포)

### 3. GitHub Actions를 사용한 자동 배포 (권장)

`.github/workflows/deploy.yml` 파일이 이미 설정되어 있습니다.

1. **Settings** > **Pages**에서 **Source**를 **GitHub Actions**로 변경
2. `main` 브랜치에 푸시하면 자동으로 배포됩니다
3. 배포가 완료되면 `https://witchshin.github.io/blog/`에서 확인할 수 있습니다

### 4. 수동 배포 (선택사항)

로컬에서 빌드하고 직접 배포하려면:

```bash
npm run build
# dist 폴더의 내용을 gh-pages 브랜치에 푸시
```

## 주의사항

- 저장소 이름이 `blog`이므로 base 경로는 `/blog/`로 설정되어 있습니다
- 만약 저장소 이름을 변경하거나 커스텀 도메인을 사용한다면 `vite.config.ts`의 `base` 설정을 수정해야 합니다

## 배포 확인

배포가 완료되면 다음 URL에서 확인할 수 있습니다:
- https://witchshin.github.io/blog/

