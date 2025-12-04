# 장서연 포트폴리오

리액트 + Vite 기반의 포트폴리오 프로젝트입니다. 

## 환경
- Node.js 18+ 권장
- 의존성 설치: `npm install`

## 개발 플로우
1. npm start`로 로컬 서버를 실행하고 변경 사항을 확인합니다.
2. 배포 전에 `npm run build`로 번들 오류를 확인합니다.

## 주요 스크립트
- `npm run start`: 개발 서버 실행(Vite).
- `npm run build`: 프로덕션 번들 생성.

## 코드 구조 개요
- `src/`: 리액트 컴포넌트와 스타일 리소스.
- `public/`: 정적 에셋.
- `vite.config.js`: Vite 및 빌드 관련 설정.

## 배포 메모
GitHub Action을 사용합니다. 
`master` 브랜치에 `marge` 하면 gh-pages 브랜치로 푸시됩니다.


# CSS 구조 및 방법론
이 프로젝트는 `src/assets/css` 폴더에서 SCSS를 사용해 스타일을 관리하며, **Atomic Design**을 기반으로 한 계층 구조를 따릅니다.

```text
src/assets/css
├─ abstracts/     # 디자인 토큰, 함수, 믹스인
├─ base/          # 리셋, 타이포그래피 등 전역 레이어
├─ components/
│  ├─ atoms/      # 최소 단위(버튼, 체크박스 등)
│  ├─ molecules/  # 단순 조합(아코디언, 드롭다운 등)
│  └─ organisms/  # 복합 UI(헤더, 팝업, 카드 리스트 등)
└─ pages/         # 페이지 전용 오버라이드
```

## 작성 규칙
- 컴포넌트 클래스는 `sy-` 접두어와 BEM 스타일을 조합합니다. (`.sy-button`, `.sy-button--primary` 등)
- 모든 SCSS 파일에서 공용 토큰/믹스인이 필요하면 `@use "../import" as *;` 또는 상대 경로를 사용해 import 합니다.
- 새로운 컴포넌트/페이지 파일을 추가할 때는 해당 폴더의 `index` 파일에 `@forward`만 추가합니다. `style.scss`를 직접 수정하지 않아도 신규 스타일이 자동 반영되도록 유지합니다.
- 계층 순서를 지키기 위해 `style.scss` → `components/_index.scss` → 하위 `index` 파일 순으로만 로드합니다. 상위 레이어에서 하위 레이어를 직접 import 하지 않도록 합니다.
