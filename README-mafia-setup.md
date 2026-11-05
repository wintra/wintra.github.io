# 워크샵 마피아 실시간 게임 배포 안내

## 페이지
- 참가자: `/mafia.html`
- 진행자: `/moderator-8f3c2a.html` (주소 은닉은 보안 수단이 아니며 Firebase 관리자 권한으로 보호)

## 확정된 역할
진행자 1명은 플레이어 배분에서 제외합니다. 플레이어 9명에게 마피아 2, 경찰 1, 의사 1, 시민 5명을 무작위 배정합니다.

## Firebase 설정
1. Firebase 프로젝트에서 웹 앱을 등록하고 `firebase-config.js`의 placeholder를 실제 웹 앱 설정으로 교체합니다.
2. Authentication에서 익명 로그인과 이메일/비밀번호 로그인을 켭니다.
3. Realtime Database를 생성하고 URL이 `firebase-config.js`와 일치하는지 확인합니다.
4. 프로젝트 루트에서 `firebase deploy --only database` 실행합니다.
5. Cloud Functions 배포에는 Blaze 요금제/결제 설정이 필요할 수 있습니다. `cd functions && npm install` 후 프로젝트 루트에서 `firebase deploy --only functions` 실행합니다.
6. Authentication에서 진행자 이메일/비밀번호 계정을 생성합니다. 신뢰된 로컬 환경에서 Admin SDK 자격 증명을 설정한 뒤 UID를 확인하고 `node set-admin-claim.js <UID>`를 실행합니다. 이후 진행자 계정에서 로그아웃 후 다시 로그인합니다.

## 권한
- 참가자는 본인 UID의 역할만 읽을 수 있습니다.
- 관리자 custom claim이 있는 계정만 전체 역할을 읽고 역할 배분/초기화를 호출할 수 있습니다.
- 역할 배분은 Cloud Functions에서 수행합니다.
- 모든 참가자에게 직업별 룰북이 공개되며, 타인의 배정 역할은 공개되지 않습니다.

## 테스트 체크리스트
- 서로 다른 기기/브라우저에서 익명 참가자 9명 접속 시 9/9로 표시되는지 확인
- 8명 또는 10명일 때 배분이 거부되는지 확인
- 9명일 때 역할 수가 마피아 2/경찰 1/의사 1/시민 5인지 확인
- 각 참가자가 본인 역할만 읽을 수 있는지 확인
- 관리자만 전체 역할 결과를 읽고 초기화할 수 있는지 확인

## 참고
Firebase 설정값은 아직 프로젝트별 실제 값으로 채워야 합니다. 이 파일은 정적 GitHub Pages 프런트엔드와 Firebase 백엔드 소스이며, Firebase 서비스 설정/배포가 끝나기 전에는 실시간 기능이 동작하지 않습니다.
