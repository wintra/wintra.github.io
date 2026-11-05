const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getDatabase}=require('firebase-admin/database');
const {randomInt}=require('node:crypto');
initializeApp();
const db=getDatabase();
function adminOnly(req){if(!req.auth||req.auth.token.admin!==true)throw new HttpsError('permission-denied','관리자만 실행할 수 있습니다.');}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
exports.assignRoles=onCall({region:'us-central1'},async req=>{
 adminOnly(req);const room=req.data?.roomId||'main';if(!/^[a-zA-Z0-9_-]{1,40}$/.test(room))throw new HttpsError('invalid-argument','잘못된 방입니다.');
 const root=db.ref('rooms/'+room),snap=await root.child('presence').get(),players=Object.entries(snap.val()||{}).filter(([,p])=>p?.online===true);
 if(players.length!==9)throw new HttpsError('failed-precondition','현재 접속 플레이어는 '+players.length+'명입니다. 정확히 9명이어야 합니다.');
 const roles=shuffle(['mafia','mafia','police','doctor','citizen','citizen','citizen','citizen','citizen']),mapping={};
 players.forEach(([uid],i)=>mapping[uid]=roles[i]);
 await root.update({roles:mapping,game:{status:'assigned',assignedAt:Date.now(),playerCount:9}});
 return {ok:true,message:'9명에게 역할을 배분했습니다.'};
});
exports.resetRoles=onCall({region:'us-central1'},async req=>{
 adminOnly(req);const room=req.data?.roomId||'main';if(!/^[a-zA-Z0-9_-]{1,40}$/.test(room))throw new HttpsError('invalid-argument','잘못된 방입니다.');
 await db.ref('rooms/'+room).update({roles:null,game:{status:'waiting',assignedAt:null,playerCount:0}});
 return {ok:true,message:'역할을 초기화했습니다.'};
});