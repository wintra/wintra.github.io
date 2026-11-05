# 강릉 워크샵 마피아 실시간 게임 설정

## 페이지
- 참가자: https://wintra.github.io/mafia.html
- 진행자: https://wintra.github.io/mafia-host-8f3c2a.html
- 기존 홈: https://wintra.github.io/

## 게임 구성
- 진행자 1명은 플레이어 9명에 포함하지 않습니다.
- 플레이어 9명: 마피아 2명, 경찰 1명, 의사 1명, 시민 5명.
- 참가자는 익명 인증, 진행자는 이메일/비밀번호 인증을 사용합니다.
- 참가자는 본인 역할만 확인하며, 모든 직업 룰북은 참가자 모두 열람할 수 있습니다.
- 기존 제시어 카드와 텔레파시 페이지는 변경하지 않았습니다.

## Firebase 프로젝트
- Project ID: gangneung-workshop
- Realtime Database URL: https://gangneung-workshop-default-rtdb.asia-southeast1.firebasedatabase.app
- 진행자 UID: 0Z4gmWcMJ3VqrzheeQniDADL5q62
- 웹 설정은 firebase-config.js에 반영되어 있습니다.

## 반드시 해야 할 콘솔 설정
1. Firebase Console에서 프로젝트 gangneung-workshop을 엽니다.
2. Build → Realtime Database → Rules로 이동합니다.
3. 저장소의 database.rules.json 전체 내용을 붙여넣고 Publish를 누릅니다.
4. Authentication → Sign-in method에서 Anonymous와 Email/Password가 활성화되어 있는지 확인합니다.
5. GitHub Pages 배포가 완료된 뒤 참가/진행자 페이지를 사용합니다.

## 보안 및 무료 요금제 관련 제한
- Realtime Database Rules는 진행자 UID만 역할 전체를 읽고 쓰도록 허용합니다. 참가자는 자기 UID에 해당하는 역할만 읽을 수 있습니다.
- 진행자 URL을 아는 것만으로 관리자 권한이 생기지는 않습니다. 진행자 로그인 후에도 UID를 확인합니다.
- Spark 무료 요금제를 유지하기 위해 Cloud Functions는 사용하지 않습니다. 역할 셔플은 진행자 브라우저에서 수행하고, 데이터베이스 규칙은 해당 UID만 역할을 쓸 수 있도록 제한합니다.
- 따라서 서버가 난수 배정 자체를 검증하는 구조는 아닙니다. 진행자 계정이 탈취되거나 진행자가 악의적으로 조작하면 역할을 바꿀 수 있습니다.
- 참가자 9명 제한은 진행자 화면에서 배분 직전에 정확히 9명인지 확인하는 방식입니다. 서버 트랜잭션으로 동시 참가 경쟁까지 엄격히 제한하는 기능은 아닙니다.
- 참가자 접속/닉네임 목록은 인증된 참가자에게 보입니다. 역할 정보와는 별도로 공개되는 정보입니다.

## 간단 테스트
1. Rules를 게시합니다.
2. 휴대폰/브라우저에서 참가 페이지를 열고 익명 참가를 테스트합니다.
3. 플레이어 9명이 접속했는지 확인합니다. 진행자는 별도 화면에서 로그인합니다.
4. 진행자 화면에서 9/9를 확인하고 역할 무작위 배분을 누릅니다.
5. 참가자 각자 본인 역할이 표시되는지 확인합니다.
6. 다른 UID의 역할 경로는 참가자 권한으로 읽을 수 없어야 합니다.
7. 게임 초기화 버튼으로 역할을 삭제하고 대기 상태로 되돌립니다.

## 문제 해결
- Permission denied: database.rules.json을 게시했는지, 진행자 UID가 정확한지 확인합니다.
- 익명 참가 실패: Authentication의 Anonymous 제공자를 확인합니다.
- 진행자 로그인 실패: Email/Password 제공자와 계정 이메일/비밀번호를 확인합니다.
- Firebase 초기화 오류: firebase-config.js의 프로젝트 설정과 databaseURL을 확인합니다.
