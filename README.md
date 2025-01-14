# 🐾 댕냥살롱 (Dangnyang Salon)  
**혼자지만 함께, 반려동물과 더 행복한 일상**  
**댕냥살롱**은 1인 가구 반려동물 가족을 위한 커뮤니티 플랫폼입니다.  
같은 상황의 견주들이 소통하고, 도움을 주고받으며 반려동물과의 행복한 삶을 함께 만들어갑니다.  


<img width="679" alt="스크린샷 2024-12-02 오후 2 09 16" src="https://github.com/user-attachments/assets/74b619bd-946a-41b5-8974-fd8276cc1d7b">

---

## 🎯 프로젝트 목표  
1인 가구 증가와 반려동물에 대한 관심이 커짐에 따라, 혼자서 반려동물을 키우는 견주들이 소통하고 도움을 받을 수 있는 커뮤니티를 제공합니다.  
댕냥살롱은 견주들이 **믿을 수 있는 돌봄 서비스**를 찾거나, **공동 활동**을 통해 교류할 기회를 마련합니다.  


---



## 🛠️ 주요 기능  

### 1. **댕냥친구소**  
: 다양한 반려동물 친구를 찾을 수 있는 공간  

| < /friends > |< /friends/pet-info-setup > | 
|:------------:|:----------:|
| <img src="https://velog.velcdn.com/images/leeeee/post/dc2449bb-aa8f-46a1-b453-3fcc9e149c0c/image.png" alt="main" width="500"/> | <img src="https://velog.velcdn.com/images/leeeee/post/053b88ec-bcab-4bae-b1ca-c718ef6ca4c8/image.png" alt="about" width="500"/> |

- `friends` : 나의 애완견에 대해 등록하고, 다른 애완견들도 살펴볼 수 있습니다. 강아지부터 고양이까지, 다양한 친구를 만나볼 수 있는 공간을 제공합니다.
- `friends/pet-info-setup` : 애완견을 등록할 수 있는 `form`을 제공합니다. 


### 2. **댕냥광장**  
: 반려동물 친화적인 장소(카페, 병원, 호텔 등) 정보 제공  

| < /community > | < /community/${id} > | < /community/post/create > |
|:--------------:|:-------------------:|:-------------------------:|
| <img src="https://velog.velcdn.com/images/leeeee/post/2544c2db-4769-476e-a78d-d8f841aacdac/image.png" alt="main" width="300"/> | <img src="https://velog.velcdn.com/images/leeeee/post/15707ea6-1d1d-4715-8cd5-1005d8b591bc/image.png" alt="about" width="300"/> | <img src="https://velog.velcdn.com/images/leeeee/post/768af684-fd52-4fed-b6bd-cde78207c2f3/image.png" alt="about" width="300"/> |


- `community` : 견주들과 교류하고 반려동물에 대한 유익한 정보를 나눌 수 있는 고민 상담 커뮤니티를 제공합니다. `견주`, `애완견 (강아지, 고양이)` 필터링을 통해 다양한 의견을 쉽게 찾을 수 있습니다.
- `community/${id}` : 개별 글에 대한 댓글과 대댓글을 작성할 수 있습니다.
- `community/post/create` : 견주 / 애완견 토글을 통해 누구의 고민인지를 설정할 수 있으며, 애완견을 선택했을 시, 애완견을 지정해서 글을 올릴 수 있도록 제공해 주었습니다. 


### 3. **댕냥터**  
: 반려동물 친화적인 장소(카페, 병원, 호텔 등) 정보 제공  

| < /places > |< /places > | 
|:------------:|:----------:|
| <img src="https://velog.velcdn.com/images/leeeee/post/9ce44c9a-1fee-4e08-b0a1-f7c5eaa64411/image.png" alt="main" width="500"/> | <img src="https://velog.velcdn.com/images/leeeee/post/15d14605-0f75-47eb-83be-25b03f619aea/image.png" alt="about" width="500"/> |

- `places` : 카카오 지도를 이용해 현재 내 위치에서 10킬로미터 반경 내의 장소들을 보여줍니다. "애견카페", "애견미용실", "동물병원", "애견호텔" 키워드를 선택하면, 해당 장소들이 지도에 표시됩니다. 지도 위 좌표와 함께, 좌측 모달에서 해당 장소들의 리스트를 확인할 수 있습니다. 모달에는 각 장소의 정보(이름, 주소, 전화번호 등)와 카카오톡으로 장소 공유하기 기능이 제공됩니다. 또한, 지도에서 해당 장소를 저장할 수 있습니다.
- `places` : 각 장소에 대해 리뷰를 작성하고, 다른 이용자들과 공유할 수 있습니다.



### 4. **댕냥창고**  
: 반려동물의 다양한 물품을 살펴보고, 공동구매로 생성

| < /store (댕냥상점)  > | <  /store (공동구매) > | < /store/group_purchase/${상품 id} > |
|:--------------:|:-------------------:|:-------------------:|
| <img src="https://velog.velcdn.com/images/leeeee/post/2d6381e1-9ffc-4948-8c98-b88913baa8d5/image.png" alt="main" width="300"/> | <img src="https://velog.velcdn.com/images/leeeee/post/9cc0910a-5c41-4da8-9c5d-37c568b519e0/image.png" alt="about" width="300"/> | <img src="https://velog.velcdn.com/images/leeeee/post/b18a5f0b-e2e2-4f00-b5de-94d03fac3328/image.png" alt="about" width="300"/> |

- `store` : 댕냥상점과 공동 구매 두 가지 토글을 통해 컴포넌트를 전환할 수 있습니다. 댕냥상점은 네이버 쇼핑 API를 이용해 다양한 반려동물 관련 상품을 제공하며, 사용자가 상품을 검색할 수 있는 기능을 제공합니다. 공동 구매는 공동구매 리스트를 보여줍니다.
- `store/group_purchase/${상품 id}` : 특정 상품에 대한 상세 정보를 보여주며, 해당 상품에 대한 공동구매 리스트를 확인할 수 있습니다.

| < /store/group_purchase/create > |< /store/group_purchase/${상품 id}/${공동구매 id} > | 
|:------------:|:----------:|
| <img src="https://velog.velcdn.com/images/leeeee/post/9e563f92-c14f-44d0-acc3-e02d805bd4de/image.png" alt="main" width="500"/> | <img src="https://velog.velcdn.com/images/leeeee/post/1f4b457d-692e-432c-bf9a-dfb849554e09/image.png" alt="about" width="500"/> |


- `store/group_purchase/create` : 해당 상품에 대한 공동구매를 생성할 수 있는 form을 제공합니다.
- `/store/group_purchase/${상품 id}/${공동구매 id}` : 공동구매의 상세보기 페이지로, 공동구매의 정보를 보여주고, 신청하기 버튼을 통해 공동구매 신청을 진행할 수 있습니다.
- 신청하기 버튼을 누르면 해당 모달을 통해 이메일을 입력받고, 입력된 이메일로 공동구매 신청 확인 이메일과 공동구매 실패 시 안내 이메일을 전송합니다 <img src="https://github.com/user-attachments/assets/104db721-59df-46ba-9f51-ad0110b6c4a6" alt="main" width="300"/>



### 5. **댕냥챗**  
: 공동구매가 성공적으로 진행되면, 참여자들과 실시간 채팅을 통해 소통

| < /chatRoom > |< /chatRoom/${id} > | 
|:------------:|:----------:|
| <img src="https://velog.velcdn.com/images/leeeee/post/b4f556e4-1af6-4867-aa62-e97bcd823c16/image.png" alt="main" width="500"/> | <img src="https://velog.velcdn.com/images/leeeee/post/beb25be6-96c1-40b8-8178-bd613143fcd5/image.png" alt="about" width="500"/> |

- `chatRoom` : 공동구매 인원이 확정되면, 자동으로 공동구매 참여자가 포함된 채팅방이 생성됩니다.
- `/store/group_purchase/${상품 id}/${공동구매 id}` : Supabase의 Realtime 데이터베이스를 이용해 실시간 채팅을 하며, 공동구매에 대한 이야기와 약속을 정할 수 있습니다.


  

---
## 🔨 사용 기술

### 프론트엔드
> - "next": "14.2.18"  
> - "react": "18"  
> - "typeScript": "5"  
> - "tailwindcss": "3.4.1"  
> - "recoil": "0.7.7"  

### 백엔드
> - Supabase: 프로젝트와 방명록 관리를 위해 사용한 데이터베이스

---

## 📚 사용 기술 스택

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil-0061F2?style=flat-square&logo=Recoil&logoColor=white"/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=Supabase&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer%20Motion-0081F1?style=flat-square&logo=Framer%20Motion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next%20Auth-000000?style=flat-square&logo=NextAuth&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil%20Persist-FF2D55?style=flat-square&logo=Recoil%20Persist&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zod-2F2F2F?style=flat-square&logo=Zod&logoColor=white"/>
</div>

---

## ☄️ 트러블 슈팅

- [Supabase 트러블슈팅](https://velog.io/@leeeee/%EB%8C%95%EB%83%A5%EC%82%B4%EB%A1%B1-supabase-%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85)
- [Recoil Persist 트러블슈팅](https://velog.io/@leeeee/%EB%8C%95%EB%83%A5%EC%82%B4%EB%A1%B1-recoil-persist-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8B%88-%EC%98%A4%EB%A5%98%EA%B0%80)

---

## ☄️ 개발 VELOG

- [댕냥살롱 시리즈](https://velog.io/@leeeee/series/%EB%8C%95%EB%83%A5%EC%82%B4%EB%A1%B1)
  - 들어가시면 트러블 슈팅 뿐만 아니라, GitHub Cron 적용, 카카오 맵 적용 등 구현한 다양한 기술들을 확인할 수 있습니다.

---

## 🚀 프로젝트

👉 [댕냥살롱 바로가기](https://mypat.vercel.app/)

---

## 📌 기여하기

댕냥살롱에 관심이 있다면 함께 만들어 가요!  
GitHub를 통해 여러분의 의견과 기여를 기다립니다. 😊

---

**댕냥살롱 – 혼자 키우는 반려동물, 더 이상 혼자가 아닙니다.**  
**🐾 함께, 더 행복한 삶을 위한 공간!**
