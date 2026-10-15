// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, setDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 실제 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCQtbp9Y9ndMshXGwzIhfFTn6v0QP0Wn1I",
  authDomain: "twin-cfeda.firebaseapp.com",
  projectId: "twin-cfeda",
  storageBucket: "twin-cfeda.firebasestorage.app",
  messagingSenderId: "118157981165",
  appId: "1:118157981165:web:d6c080fefaf3ecbda123e4",
  measurementId: "G-1NQEECW7XQ"
};

const app = initializeApp(firebaseConfig);

// 최신 Firestore 오프라인 멀티탭 캐시 설정
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

// 공통 기기 고유 유저 ID 생성/불러오기
function getOrCreateUserId() {
    let userId = localStorage.getItem('common_user_id');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        localStorage.setItem('common_user_id', userId);
    }
    return userId;
}

// 오프라인 안심 동기화 함수
async function syncGameDataToFirebase(gameKey, nickname, maxLevel) {
    const userId = getOrCreateUserId();
    const syncData = {
        userId: userId,
        [`${gameKey}_nickname`]: nickname,
        [`${gameKey}_maxLevel`]: maxLevel,
        [`${gameKey}_updatedAt`]: Date.now()
    };
    
    localStorage.setItem(`${gameKey}_pending_sync`, JSON.stringify(syncData));

    if (!navigator.onLine) {
        console.log(`[${gameKey}] 오프라인 상태: 로컬(Pending) 보관`);
        return;
    }

    try {
        const userRef = doc(db, "rankings", userId);
        await setDoc(userRef, syncData, { merge: true });
        localStorage.removeItem(`${gameKey}_pending_sync`);
        console.log(`[${gameKey}] Firebase 동기화 성공!`);
    } catch (e) {
        console.warn(`[${gameKey}] Firebase 전송 실패:`, e);
    }
}

// 네트워크 재연결 시 미전송 데이터 일괄 전송
window.addEventListener('online', () => {
    console.log("네트워크 재연결: 미전송 데이터 동기화 시작");
    ['game1', 'game2'].forEach(gameKey => {
        const pending = localStorage.getItem(`${gameKey}_pending_sync`);
        if (pending) {
            try {
                const data = JSON.parse(pending);
                syncGameDataToFirebase(gameKey, data[`${gameKey}_nickname`], data[`${gameKey}_maxLevel`]);
            } catch (e) {}
        }
    });
});

// 전역(Window) 등록
window.db = db;
window.userId = getOrCreateUserId();
window.syncGameDataToFirebase = syncGameDataToFirebase;
window.fsDoc = doc;
window.fsGetDocs = getDocs;
window.fsQuery = query;
window.fsOrderBy = orderBy;
window.fsLimit = limit;