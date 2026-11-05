// 신뢰된 로컬 환경에서 Firebase Admin SDK Application Default Credentials로 실행
// node set-admin-claim.js <ADMIN_UID>
const {initializeApp,applicationDefault}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
initializeApp({credential:applicationDefault()});
(async()=>{const uid=process.argv[2];if(!uid)throw new Error('관리자 UID를 전달하세요.');await getAuth().setCustomUserClaims(uid,{admin:true});console.log('admin claim set:',uid)})().catch(e=>{console.error(e);process.exit(1)});