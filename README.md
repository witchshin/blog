# 정적 블로그

React + TypeScript + Vite로 만든 정적 블로그 사이트입니다.

## 기능

- ✅ 정적 페이지 빌드 (GitHub Pages 호스팅 지원)
- ✅ 마크다운으로 글 작성 및 렌더링
- ✅ Home, About, Blog 메뉴
- ✅ 월별 포스트 관리
- ✅ 태그 및 카테고리 분류
- ✅ 아름다운 반응형 디자인

## 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

### 빌드

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

## 포스트 작성하기

`src/posts/YYYY/MM/` 디렉토리에 마크다운 파일을 생성하세요.

마크다운 파일은 다음과 같은 frontmatter를 포함해야 합니다:

```markdown
---
title: 포스트 제목
date: 2024-12-25
tags: [태그1, 태그2]
category: 카테고리명
slug: post-slug
excerpt: 포스트 요약
---

# 포스트 내용

여기에 마크다운으로 내용을 작성하세요.
```

## GitHub Pages 배포

1. GitHub 저장소를 생성하고 코드를 푸시합니다.
2. 저장소 설정에서 Pages를 활성화합니다.
3. Source를 "GitHub Actions"로 설정합니다.
4. `.github/workflows/deploy.yml` 파일이 자동으로 배포를 처리합니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Remark (마크다운 처리)
- Gray Matter (Frontmatter 파싱)

## 라이선스

MIT
