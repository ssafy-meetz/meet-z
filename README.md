# 1. MEET:Z   소개
![alt text](meetz-back/meetz/src/main/resources/Meetzlogo.png)
Naming : "팬과 스타의 MEET을 이뤄주는 영통팬싸 플랫폼"

- 기간: 24.07.08 ~ 24.08.16 (7주)
- 인원: 6명 (BE: 3, FE: 3)
- 트랙: 웹기술

### 주요 기능

**아이돌 팬미팅 자동화 플랫폼**

- 엑셀 명단 중 블랙리스트 필터링
- 대규모 팬미팅 자동화 시스템
- 매니저 미팅 실시간 모니터링(채팅)
- 미팅 중 신고, 경고, 블랙리스트 등록
- 스타와 인생네컷, 사진 이메일 발송

## 📃 문서
[💻 Notion](https://www.notion.so/di-son/MEET-Z-1cc0d67f068149d78a452fa593e4b4b5)
------------------------------------------------------

# 2. 🔍 개발 환경
  
## 2-1. 환경 설정
    
### **Frontend**
- Vite
- React
- TypeScript
- Zustand (상태 관리)
- Tailwind CSS
- React Router Dom
- Stomp JS (웹소켓 통신)

### **Backend**
- Spring Boot
- Spring Security

### **데이터베이스**
- MySQL (관계형 데이터베이스)
- MariaDB
- Redis

### **개발 도구 및 환경**
- Jira (일정 관리)
- GitLab (코드 저장소)
- IntelliJ
- VS Code

### **클라우드 및 인프라**
- Naver Cloud (클라우드 플랫폼)
- Nginx (웹 서버 및 리버스 프록시)
- Jenkins (CI/CD)
- Docker (컨테이너화)

      
  

## 2-2. 서비스 아키텍처
  
![image](/meetz-back/meetz/src/main/resources/Architecture.png)

## 2-3 ERD
![D110_까까_ERD](/meetz-back/meetz/src/main/resources/ERD-image.png)

------------------------------------------------------  

# 3. 🦈 주요 기능
------------------------------------------------------
# 주요 기능

# 1. 미팅 일정 등록 및 팬 명단 관리
- **미팅 일정 등록**: 매니저가 미팅 정보와 스타 명단을 입력하고 팬 명단 엑셀 파일을 업로드하면 자동으로 데이터가 등록
- **임시 계정 안내**: 팬들은 임시 계정을 통해 사이트에 로그인
- **블랙리스트 필터링**: 업로드된 팬 명단에서 블랙리스트에 포함된 팬을 자동으로 필터링

# 2. 팬 미팅 대기 페이지 기능
- **대기 페이지 접속**: 팬은 로그인 후 닉네임 설정, 카메라 테스트, 메모 저장 가능
- **실시간 모니터링**: 매니저는 미팅 중 팬과 스타의 상황을 실시간으로 모니터링

# 3. 미팅 시작 및 팬-스타 만남 기능
- **미팅 진행**: 팬들은 정해진 순서대로 스타와 만남
- **대규모 팬미팅 자동화**: 대규모 팬미팅을 자동화된 시스템으로 관리

# 4. 기념사진 촬영 기능
- **사진 촬영**: 스타와 팬이 함께 사진 촬영

# 5. 미팅 종료 후 기념사진 프레임 선택 기능
- **프레임 선택**: 팬싸인회 종료 후 사진 프레임 선택
- **프레임 선택 사진 이메일 발송**: 선택된 사진을 이메일로 전송

# 6. 팬 신고 기능
- **신고**: 스타나 매니저가 팬을 신고
- **경고 및 블랙리스트 등록**: 팬에게 경고하거나 블랙리스트에 추가

# 7. 미팅 종료 후 음성 파일 처리
- **음성 파일 비속어 필터링**: 미팅이 끝난 후, 일괄적으로 음성 파일 녹음본을 비속어 필터링 처리
- **신고 테이블 저장**: 비속어가 검출되면 해당 내용을 신고 테이블에 저장

--------------------------

# 4. 배포
------------------------------------------------------
1. Merge to develop branch : GitLab의 develop branch에 Merge<br>
2. Webhook Trigger : Jenkins에 웹훅을 보냄<br>
3. Jenkins PipeLine 실행 : 최신 소스 코드를 받아 도커 이미지 생성 및 컨테이너로 띄움
  
  
--------------------------
# 5. Cooperation
  
  ## Tools

    - Git

    - Jira

    - Notion

    - Mattermost

    - Discord

    - Gerrit

    - Jenkins
          
--------------------------
# 6. Git Flow

## 과정 요약🔥

1. 깃랩에서 이슈 생성
2. 로컬 develop 브랜치에서 `git pull origin develop` 하기
3. `git checkout -b feature/기능-#이슈번호`
4. 새로 만든 브랜치에서 열심히 작업한다.
5. `git add “파일”` → 파일을 개별로  add 
6. `git commit -m “커밋메시지”`
7. git add → git commit 반복
8. [`git push origin feature/기능-#이슈번호`]
9. create merge request
10. git merge
  ```
# Commit Convention
# <타입> 리스트
[커밋 타입]

📌 feat: 새로운 기능 추가, 기능 수정, 삭제

📌 fix: 오류, 버그 수정

📌 docs: README나 WIKI 같은 문서 개정

📌 style: 코드 스타일 혹은 포맷 등에 관한 커밋
📌 refactor:  코드 리팩토링에 대한 커밋 (쓸모없는 코드 삭제 등)
📌 test : 테스트 코드 수정에 대한 커밋

📌 config : 모듈 설치, 설정 파일 추가, 라이브러리 추가, 패키지 구조 수정 등

📌 chore: 간단한 코드 수정(오탈자 등), 내부 파일 수정 등 기타 변경 사항

📌 rename: 파일 이름 변경이 있을 때 사용

📌 remove : 파일 삭제
# ------------------
```
[커밋 메세지 양식]
```
[파트] 타입: 제목 (#이슈번호 있다면 붙이기!) 
```

- 과거시제 사용x , 명령조로 작성
- 완전한 서술형 문장이 아니라 간결하고 요점적인 서술을 위해 개조식 구문 사용

ex)
[FE] feat: 검색 바 뷰 추가 (#2)

[BE] feat: merberDto 추가 (#3)

--------------------------------------------

# 7. 👨‍👩‍👧‍👦 팀원 소개

------------------------------------------------------
# 팀원 역할 및 담당

| 손다인 | 이승원 | 김태연 | 강창우 | 신민경 | 서민수 |
| ----- | ------ | ----- | ------ | ----- | ------ |
|

| Contributors | Role | Position |
| ------------ | ---- | -------- |
| 　손다인 | 팀장, <br /> Backend | - 유저관리<br>- 미팅일정<br>- 웹소켓 채팅<br> |
| 　이승원 | 팀원, <br /> Backend Lead | - Infra<br>- 미팅 자동화 시스템   |
| 　김태연 | 팀원, <br /> Backend <br />  | - 비속어 필터링<br>- 팬 경고, 신고 기능 |
| 　강창우 | 팀원, <br /> Frontend Lead| - 유저관리<br>- 미팅일정<br>- 웹소켓 채팅<br>- 팬 경고/신고<br> |
| 　신민경 | 팀원, <br /> Frontend, <br />| - Infra<br> - UI/UX디자인<br> - 미팅 자동화 시스템<br>  |
| 　서민수 | 팀원, <br /> Frontend <br />| - UI/UX 디자인<br>- 퍼블리싱<br>- 블랙리스트 |
