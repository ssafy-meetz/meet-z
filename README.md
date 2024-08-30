![image](/docs/main.jpg)
# ❤ MEET:Z 소개
> "팬과 스타의 MEET을 이뤄주는 영통팬싸 플랫폼"

## 📅 개발 기간
**24.07.08 ~ 24.08.16** (7주)

(SSAFY 공통 프로젝트 - 웹 기술 트랙)

## 👨‍💻 팀원

| 손다인 | 이승원 | 김태연 |
| -------- | -------- | -------- | 
| 팀장 | 팀원 | 팀원 |
| BE | BE | BE | FE | FE | FE |
| - 유저관리<br>- 미팅일정<br>- 웹소켓 채팅<br> | - Infra<br>- 미팅 자동화 시스템   | - 비속어 필터링<br>- 팬 경고, 신고 기능 |
| 강창우 | 신민경 | 서민수 |
| -------- | -------- | -------- |
| 팀원 | 팀원 | 팀원 |
|  FE | FE | FE |
|- 유저관리<br>- 미팅일정<br>- 웹소켓 채팅<br>- 팬 경고/신고<br> |- Infra<br> - UI/UX디자인<br> - 미팅 자동화 시스템<br>  | - UI/UX 디자인<br>- 퍼블리싱<br>- 블랙리스트 |

## 📃 문서
[💻 Notion](https://www.notion.so/di-son/MEET-Z-1cc0d67f068149d78a452fa593e4b4b5)

# 2. 🔍 개발 환경

## 2-1. 환경 설정

  ### 👨‍💻 **Frontend**
  
    - Vite
    - React
    - TypeScript
    - Zustand (상태 관리)
    - Tailwind CSS
    - React Router Dom
    - Stomp JS (웹소켓 통신)

  ### 👨‍💻 **Backend**

    - Spring Boot
    - Spring Security

  ### 👨‍💻 **DB**

    - MySQL
    - MariaDB
    - Redis
    - Naver Cloud

  ### 👨‍💻 **CI/CD**
  
    - AWS EC2
    - Jenkins
    - Docker
    - nginx
    
  ### 👨‍💻 **Web RTC**

  - openvidu 2.25

  ### 👨‍💻 **협업 툴**

  - Git Lab
  - Jira
  - Mattermost
  - Discord

## 2-2. 개발문서
  ### ** 아키텍처 **
  ![image](/meetz-back/meetz/src/main/resources/Architecture.png)

  ### ** ERD **
  ![D110_까까_ERD](/meetz-back/meetz/src/main/resources/ERD-image.png)


# 3. ❤ 주요 기능

## 주요 기능

![image](/docs/meetz_0.gif)
![image](/docs/meetz_1.gif)
![image](/docs/meetz_2.gif)
![image](/docs/meetz_3.gif)
![image](/docs/meetz_4.gif)

# 4. ⚙ Git Flow

## 🖱 과정 요약

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

## 🗨 Commit Convention

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
