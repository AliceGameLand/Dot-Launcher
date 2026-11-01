# 귀염뽀쨕도트 런처 1.0.0 검증

검증일: 2026-11-01 (Asia/Seoul). 기반 커밋: 0ca22571417cb4fdccb2744c4c719809f4922857.

## 변경

- 제품명·창 제목·설치파일·업데이트·문의 주소를 Dot-Launcher로 변경했습니다.
- index.js에서 전용 Electron 설정 폴더를 지정합니다. configmanager.js는 .dotlauncher 게임 폴더와 DotLauncherNatives 임시 폴더를 사용합니다.
- diamonddistribution.js가 원격·캐시·새로고침·로컬 개발 로딩에 다이아몬드 단일 인스턴스 제한을 적용합니다. 유효한 원격 항목이 없으면 기존 캐시를 보존합니다.
- 투명 캐릭터 아이콘과 Minecraft 공식 Beach Cabin 배경을 적용하고 앨리스 개인 방송 링크를 제거했습니다. 이미지 출처와 편집 프롬프트는 ASSETS.md에 기록했습니다.

## 자동 검증

- Node.js 22.23.4: ESLint 통과, node --test test/*.test.js 14개 통과.
- 테스트 범위: 기존 계정 처리·튜토리얼 옵션·업데이트 상태, 다이아몬드 단일 선택·다운로드 정보 보존·원격 실패·항목 누락·중복 항목·캐시 복구·새로고침·로컬 개발 모드, 앨리스 계정 및 게임·임시 폴더 분리.
- 실제 공개 배포 1.0.242에서 AliceDiamond-26.2 한 개와 모듈 33개를 확인했습니다. 원본 모듈 객체와 다운로드 주소·해시는 변경하지 않았습니다.
- 배포 URL의 options.txt와 iris.properties를 받아 tutorialStep:none, guiScale:4, enableShaders=true, ComplementaryReimagined_r5.9.1.zip 기본값을 확인했습니다. 두 파일의 MD5 필드는 없으며 기존 설정 보존 동작을 유지합니다.
- PNG 바깥 모서리 알파 0, 얼굴 표본 알파 254, ICO 16·24·32·48·64·128·256 크기를 확인했습니다. 공식 배경은 1920×1080입니다.

## Windows 패키지

- Node.js 22에서 electron-builder build --win nsis --publish never로 빌드했습니다. Temurin JDK 25.0.4.1+1 번들을 포함합니다.
- app.asar 내 주요 소스·이미지 13개가 작업 파일과 일치하며 빌드 캐시는 포함되지 않는 것을 확인했습니다.
- 제품명은 귀염뽀쨕도트 런처, 버전은 1.0.0입니다. app-update.yml은 AliceGameLand/Dot-Launcher와 dot-launcher-updater를 가리킵니다.
- 설치파일: dist/dot-launcher-setup-1.0.0.exe. 공개 릴리스는 게시하지 않았습니다. 첫 릴리스가 없으므로 자동 업데이트 확인은 아직 실패할 수 있습니다.

## 화면 확인과 남은 검증

- 개발 실행의 실제 환영 화면에서 공식 배경·캐릭터 아이콘·창 제목·긴 한글 환영 문구를 확인했습니다. 실제 로딩 완료와 다이아몬드 기본 선택도 확인했습니다.
- 이후 사용자의 Escape 입력으로 Computer Use가 중단되어 추가 UI 조작은 진행하지 않았습니다. 로그인 이후 메인 화면과 로딩 화면의 시각 검증은 남아 있습니다.
- 실제 Microsoft 로그인·게임 실행·서버 접속·설치 프로그램을 통한 설치는 수행하지 않았습니다. 사용자 계정이 필요한 실제 접속과 별도 설치 검증은 후속 확인 사항입니다.
- 원본 앨리스 런처 저장소는 변경하지 않았습니다.

## 설치파일 확인값

- 크기: 224369097 bytes
- SHA-256: 4E8ACAEE994C5CA0A4D72C8B437966B333E3445D1001CED20F2EA8FAF241CBA9
