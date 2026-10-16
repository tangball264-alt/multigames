# 🎮 멀티팡팡 (Multi-PangPang)

> **AI 기반 바이브 코딩(Vibe Coding) 기법**으로 제작된 모바일 웹 기반 멀티 미니게임 플랫폼입니다.  
> 기억력 카드 게임과 대한민국 국토 대장정 퀴즈를 한 공간에서 원터치로 즐길 수 있습니다.

---

## 🤖 AI & No-Code Development Notice

본 프로젝트는 전통적인 하드코딩 방식 대신, **AI 도구를 활용한 노코드/저코드 중심의 바이브 코딩(Vibe Coding)** 방식을 도입하여 구축되었습니다.

- **개발 방식:** 프로젝트 기획 및 UI/UX 구조화 ➔ Gemini Canvas 기반 AI 코드 생성 ➔ 리팩토링 및 소량의 커스텀 기능 수정
- **사용한 주요 AI 도구:** 
  - **Gemini Canvas / Gemini:** 전체 HTML, CSS(Tailwind CSS), Vanilla JavaScript 알고리즘 구현 및 로직 빌드
  - **프롬프트 엔지니어링:** 자연어 기반 데이터 구조 설계 및 오프라인 안심 동기화 로직 구현
- **직접 수정 및 조율 (Human-in-the-Loop):**
  - Firebase Firestore 오프라인 멀티탭 캐시 및 통합 랭킹 동기화 연동
  - `iframe` 독립 스위칭 상단 바 UI 조율 및 자원 경로 매핑
  - 이미지 소스 코드 연동
  - Android Studio & Capacitor 사용 apk 파일 생성.

---

## 🌟 주요 게임 및 핵심 기능

### 1. 🧠 기억력 테스트: 카드 순서 기억하기 & 내 방 꾸미기 (`game1.html & firebase-init.js`)
- **기억력 매칭 게임:** 단계별(1~50 Level, 5개 Stage)로 점진적으로 늘어나는 카드 순서를 기억하고 순서대로 클릭하는 브레인 트레이닝
- **인터랙티브 내 방 꾸미기 (Decorate Room):**
  - 게임 플레이로 획득한 코인으로 벽지, 가구, 소품, 반려동물 구입
  - **드래그 앤 드롭(Drag & Drop)**으로 자유로운 위치 배치, Layer 순서 조절(▲/▼), 좌우 반전(🔄) 지원
- **실시간 시스템:** 10분 주기 하트 자동 충전, 일일/주간/월간 미션, 보상형 광고 시뮬레이션
- **Firebase Firestore 데이터 동기화 & 랭킹 시스템:**
  - 기기 고유 ID 기반으로 유저 닉네임과 최고 클리어 레벨(Max Level)을 Firestore DB에 실시간 저장
  - 인터넷이 연결되지 않은 상태(오프라인)일 때 `localStorage`에 임시 보관 후, 네트워크 연결 재개(`online` 이벤트) 시 자동 일괄 동기화 처리
  - 전 세계/전체 유저 최고 기록 기반의 **실시간 명예의 전당 (리더보드)** 수록

### 2. 🗺️ 대한민국 국토 대장정 퀴즈 (`game2.html`)
- **전국 팔도 탐험 루트:** 서울, 경기도, 강원도, 충청도, 전라도, 경상도, 제주도 총 7개 지역 70개 스테이지
- **시각적 명소 프리뷰 & 퀴즈:** 각 지역 대표 유적/명소 고화질 이미지 관람, 10초 제한시간 퀴즈 및 50:50 힌트 지원. 응답 시간별 획득 별(⭐) 개수 차별화
- **여정 일지 & 명예의 전당:** 유저 레벨 및 경험치(EXP) 보상, 획득한 별(⭐) 기반 랭킹

### 3. 🔄 통합 멀티 스위처 (`index.html`)
- **원터치 게임 전환:** `iframe` 스위칭 방식을 통한 독립적 상태 유지 및 원터치 게임 변경

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 스택 |
| :--- | :--- |
| **Frontend** | HTML5, JavaScript (ES6+ Vanilla JS), Tailwind CSS (CDN) |
| **Icons & Visuals** | FontAwesome 6, Canvas Confetti |
| **Database / BaaS**| Firebase Firestore (10.8.0), LocalStorage |
| **AI Tooling** | Google Gemini, Gemini Canvas |

---

## 📁 프로젝트 구조 (Project Structure)

```text
.
├── index.html          # 메인 프레임 및 원터치 게임 스위처 (Iframe 기반)
├── game1.html          # [게임 1] 기억력 테스트 & 내 방 꾸미기 (+ Firebase 랭킹 연동)
├── game2.html          # [게임 2] 대한민국 국토 대장정 퀴즈
├── firebase-init.js    # Firebase 초기화 및 오프라인 멀티탭 동기화 모듈
└── images/             # 게임 내 사용된 명소 및 가구 이미지 자원
    ├── g1_img/         # 내 방 꾸미기 가구/소품 이미지
    └── g2_img/         # 국토 대장정 지역별 명소 고화질 이미지
