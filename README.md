# 트위치 투표 추첨기

## 소개

[트위치 투표 추첨기](https://chrome.google.com/webstore/detail/%ED%8A%B8%EC%9C%84%EC%B9%98-%ED%88%AC%ED%91%9C-%EC%B6%94%EC%B2%A8%EA%B8%B0/ocnplnjcbicbpbnlmpljfgicnpibidgj)는 [트위치](https://www.twitch.tv/)의 채팅창을 이용하여 투표와 추첨을 하는 프로그램입니다.  

* **간편추첨:** 채팅창에 아무 말이나 입력하면 자동으로 참여됩니다. 이후 스트리머가 추첨 버튼을 눌러 시청자 한 명을 뽑아 대화할 수 있습니다. 시청자는 평범하게 채팅창에 채팅을 입력하면 됩니다.  

* **숫자투표:** 채팅창에 `!투표 1` 를 입력하면 투표 할 수 있습니다.  

## 이용 방법

* **시청자:** 아무것도 할 필요 없습니다. 트위치의 채팅창에서 스트리머의 진행에 따라 평범하게 채팅을 입력하면 됩니다.

* **스트리머:** 아래의 설치 방법을 읽고 크롬 웹스토어에서 확장프로그램을 설치 후, 구글 크롬 브라우저의 우측 상단에서 퍼즐모양 아이콘(확장프로그램)을 눌러 `트위치 투표 추첨기` 항목을 선택하면 페이지가 열립니다.

## 설치 방법

이 저장소의 버전은 아직 개발이 진행중이며, 이용자분들께서는 기존버전 그대로 이용하시면 됩니다. 새 버전이 완성되면 기존 버전에서 안내 받을 수 있도록 업데이트 할 예정입니다.  

[(기존 버전) 크롬 웹스토어에서 설치하러 가기](https://chrome.google.com/webstore/detail/%ED%8A%B8%EC%9C%84%EC%B9%98-%ED%88%AC%ED%91%9C-%EC%B6%94%EC%B2%A8%EA%B8%B0/ocnplnjcbicbpbnlmpljfgicnpibidgj)

## 왜 새 버전으로 변경해야 하나요?

수 년 사이, Chrome에도 Twitch에도 API에 크고 작은 변경점들이 많이 생겼습니다. Chrome Extension의 경우 기존의 MV2는 2022년을 마지막으로 만료되어 2023년 1월이 오기 전에 MV3으로 반드시 변경해야 합니다.  

[https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/](https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/)

한 편, Twitch에서는 OAuth 인증시 chrome-extension:// 프로토콜로의 Redirect URI를 등록 할 수 없도록 변경되었습니다.  

이 두 가지 변경사항이 겹치면서 더 이상 기존의 방식으로는 트위치 인증이 불가능해졌기 때문입니다.
