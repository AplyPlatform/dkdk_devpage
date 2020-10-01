---
title: DKDK OPEN API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - php
  - javascript
  - python
  - http

toc_footers:
  - <div class="fb-like" data-href="https://www.facebook.com/dkdkheart" data-width="100" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
  - <a href='https://dev.dkdk.io'>DKDK 개발자홈</a>
  - <a href='https://groups.google.com/forum/#!forum/dkdk_dev_aply'>두근두근 API 문의</a>
  - <a href='https://facebook.com/dkdkheart'>DKDK 페이스북</a>
  - <a href='https://dkdk.io/'>DKDK 홈</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>
  - © 2020 <a href='https://aply.biz'>APLY Inc.</a>
includes:
  - errors

search: true
---

# 소개

'오늘도 어제처럼 두근두근'

두근두근 Open API의 사용 설명서입니다.
인터넷이 지원되는 디바이스에서 친구나 지인의 두근두근 앱으로 두근거림을 보내거나 받을 수 있는 방법을 설명합니다.

<img src="./images/dkdk_open_api.png" class="imgstyle">

Open API를 사용하는 첫번째 예제 입니다.
내가 만든 어떤 특별한 장치에서 친구의 스마트폰에 있는 두근두근으로 두근거림을 보낼 수 있습니다.

<img src="./images/dkdk_open_api-2.png" class="imgstyle">

Open API를 사용하는 두번째 예제 입니다.
친구가 스마트폰의 두근두근을 터치할 경우 내가 만든 장치에서 두근거림을 받을 수 있습니다.


# Token 발급 받기

> API의 사용을 위해 DKDK Token을 발급 받기 위한 방법입니다.


```shell

```

```php

```

```javascript

```

```python

```


>

사용자 등록/로그인 API를 제외한 모든 API는 사용자 Token을 http 헤더의 파라메터로 입력해야 사용할 수 있습니다.
순서는 다음과 같습니다.

1. 사용자가 로그인시 사용한 OAuth 서비스 종류, 서비스로 부터 받은 토큰, Push 전송용 디바이스 토큰, 닉네임 정보를 포함하여 사용자 등록 API호출
2. 잠시후 사용자 토큰이 포함된 푸시 메시지 수신 (푸시 메시지 Decoding 방법은 하기의 푸시 메시지 항목 참조)
3. 사용자 토큰을 별도로 저장 (로그아웃, 탈퇴시 삭제)

또는,

1. 로그인 API호출
2. 호출한 API 응답에 사용자 토큰 포함, 획득

또는, 아래 경로에서 개발자Token을 발급 받으세요.

[DKDK 개발자Token 발급](https://dev.dkdk.io/).

Token의 사용방법은 각 API의 설명을 참고해 주세요.


# 사용자 검색/차단/해제

## 사용자 검색하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"find_friend", "user_uuid" : "MY_UUID", "friend_nickname" : "FRIEND_NICKNAME"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'find_friend';
$body['user_uuid'] = 'MY_UUID';
$body['friend_nickname'] = 'FRIEND_NICKNAME';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "find_friend", "user_uuid" : "MY_UUID", "friend_nickname" : "FRIEND_NICKNAME"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'find_friend',
    'user_uuid' : 'USER_UUID',
    'friend_nickname' : 'FRIEND_NICKNAME'
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success",
    "user_uuid" : "FRIEND_UUID",
    "imageData" : "BASE64_ENCODED_IMAGE" //(이미지가 있을 경우)
  }

  //친구가 없을 경우
  {
    "result": "failed",
    "reason" : "no user"
  }

  //daction 에 'more' 파라메터 입력시 응답 (최대 5개 항목 응답)
  {
    "result": "success",
    "data" : [
      {
        "user_uuid" : "FRIEND_UUID",
        "user_nickname" : "FRIEND_NICKNAME",
        "imageData" : "BASE64_ENCODED_IMAGE" //(이미지가 있을 경우)
      },
      {
        "user_uuid" : "FRIEND_UUID_2",
        "user_nickname" : "FRIEND_NICKNAME_2",
        "imageData" : "BASE64_ENCODED_IMAGE" //(이미지가 있을 경우)
      }
    ]
  }
```

닉네임으로 사용자를 검색합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'find_friend'를 입력합니다.
friend_nickname | 검색할 사용자의 닉네임을 입력합니다.
daction | 이 파라메터에 'more'를 입력할 경우, friend_nickname 에 입력한 문구가 포함되어 있는 닉네임을 가진 모든 사용자 목록을 배열로 응답합니다(옵션)


## 차단 목록에 추가

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"add_to_deny", "user_uuid" : "MY_UUID", "target_user_uuid" : "USER_UUID", "target_user_nickname" : "USER_NICKNAME"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'add_to_deny';
$body['user_uuid'] = 'MY_UUID';
$body['target_user_uuid'] = "USER_UUID";
$body['target_user_nickname'] = "USER_NICKNAME";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "add_to_deny", "user_uuid" : "MY_UUID", "target_user_uuid" : "USER_UUID", "target_user_nickname" : "USER_NICKNAME"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, added.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'add_to_deny',
    'user_uuid' : 'MY_UUID',
    'target_user_uuid' : "USER_UUID",
    'target_user_nickname' : "USER_NICKNAME"
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

사용자를 차단목록에 추가합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'add_to_deny'를 입력합니다.
target_user_uuid | 차단할 사용자의 user_uuid 값을 입력합니다.
target_user_nickname | 차단할 사용자의 닉네임 값을 입력합니다.


## 차단 목록에서 삭제

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"remove_from_deny", "user_uuid" : "MY_UUID", "target_user_uuid" : "USER_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'remove_from_deny';
$body['user_uuid'] = 'MY_UUID';
$body['target_user_uuid'] = "USER_UUID";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "remove_from_deny", "user_uuid" : "MY_UUID", "target_user_uuid" : "USER_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, added.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'remove_from_deny',
    'user_uuid' : 'MY_UUID',
    'target_user_uuid' : "USER_UUID"
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

차단 목록에서 사용자를 삭제합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'remove_from_deny'를 입력합니다.
target_user_uuid | 차단 해제 할 사용자의 user_uuid 값을 입력합니다.


# 친구 요청/수락/헤어지기 [DEPRECATED]

## 친구 요청하기 [DEPRECATED]

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"request", "user_uuid" : "MY_UUID", "friend_nickname" : "FRIEND_NICKNAME"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'request';
$body['user_uuid'] = 'MY_UUID';
$body['friend_nickname'] = "FRIEND_NICKNAME";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "request", "user_uuid" : "MY_UUID", "friend_nickname" : "FRIEND_NICKNAME"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'request',
    'user_uuid' : 'USER_UUID'
    'friend_nickname' : "FRIEND_NICKNAME"
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

친구를 등록합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'request'를 입력합니다.
friend_nickname | 친구로 요청할 대상의 닉네임 값을 입력합니다.


## 친구요청 수락하기 [DEPRECATED]


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"accept", "friend_uuid" : "FRIEND_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'accept';
$body['user_uuid'] = 'USER_UUID';
$body['friend_uuid'] = 'FRIEND_UUID';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;

```

```javascript


var jdata = {"action": "accept", "user_uuid" : "USER_UUID", "friend_uuid" : "FRIEND_UUID" };

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'accept',
    'user_uuid' : 'USER_UUID'
    'friend_uuid' : 'FRIEND_UUID'
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()


```
> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
{
  "result" : "success",
  "friend_uuid" : "FRIEND_UUID",
  "imageData" : "BASE64_ENCODED_IMAGE"
}

```

친구요청을 수락합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
action | 'accept'를 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
friend_uuid | 친구요청 전송에 성공했을때 수신한 friend_uuid를 입력합니다.



## 친구와 헤어지기 [DEPRECATED]

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"bye", "friend_uuid" : "FRIEND_UUID"' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'bye';
$body['user_uuid'] = 'USER_UUID';
$body['friend_uuid'] = "FRIEND_UUID";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "bye", "user_uuid" : "USER_UUID", "friend_uuid" : "FRIEND_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'bye',
    'user_uuid' : 'USER_UUID'
    "friend_uuid" : "FRIEND_UUID"
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

친구목록에서 삭제 요청을 전송합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'bye'를 입력합니다.
friend_uuid | 친구요청 전송에 성공했을때 수신한 friend_uuid 값을 입력합니다.



# 친구 목록 관리

## 친구 등록하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"add_to_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'add_to_friend';
$body['user_uuid'] = 'MY_UUID';
$body['friend_uuid'] = "FRIEND_UUID";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "add_to_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'add_to_friend',
    'user_uuid' : 'USER_UUID'
    'friend_uuid' : "FRIEND_UUID"
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

사용자를 친구목록에 등록합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'add_to_friend'를 입력합니다.
friend_uuid | 친구로 등록할 대상의 user_uuid 값을 입력합니다.



## 친구 삭제하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"bye", "friend_uuid" : "FRIEND_UUID"' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'bye';
$body['user_uuid'] = 'USER_UUID';
$body['friend_uuid'] = "FRIEND_UUID";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "bye", "user_uuid" : "USER_UUID", "friend_uuid" : "FRIEND_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'bye',
    'user_uuid' : 'USER_UUID'
    "friend_uuid" : "FRIEND_UUID"
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

친구목록에서 친구를 삭제합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'bye'를 입력합니다.
friend_uuid | 친구목록에서 삭제할 user_uuid 값을 입력합니다.


# 두근거림을 보낼 대상 관리

## 보낼 대상 설정/해제하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"target_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "target" : true}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'target_friend';
$body['user_uuid'] = 'MY_UUID';
$body['friend_uuid'] = "FRIEND_UUID";
$body['target'] = true;

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"target_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "target" : true};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    "action":"target_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "target" : true
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

두근거림을 보낼 친구를 선택 또는 해제 합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'target_friend'를 입력합니다.
friend_uuid | 두근거림을 보낼 친구의 user_uuid 값을 입력합니다.
target | 보낼 대상으로 선택하면 true, 그렇지 않으면 false를 입력합니다.



## 모든 친구를 대상으로 선택하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"target_friend", "user_uuid" : "MY_UUID", "target_all" : true}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'target_friend';
$body['user_uuid'] = 'MY_UUID';
$body['target_all'] = true;

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"target_friend", "user_uuid" : "MY_UUID", "target_all" : true};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    "action":"target_friend", "user_uuid" : "MY_UUID", "target_all" : true
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

모든 친구를 두근거림을 보낼 대상으로 선택합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'target_friend'를 입력합니다.
target_all | true 를 입력합니다.


## 1명만 대상으로 선택하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"target_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "target_one" : true}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'target_friend';
$body['user_uuid'] = 'MY_UUID';
$body['friend_uuid'] = 'FRIEND_UUID';
$body['target_one'] = true;

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"target_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "target_one" : true};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    "action":"target_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "target_one" : true
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

두근거림을 보낼 대상을 한명만 남기고 모두 선택해제 합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'target_friend'를 입력합니다.
friend_uuid | 두근거림을 보낼 친구의 user_uuid 값을 입력합니다.
target_one | true 를 입력합니다.


## AR위치 보낼 대상 설정/해제하기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"share_loc_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "shareloc" : true}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'share_loc_friend';
$body['user_uuid'] = 'MY_UUID';
$body['friend_uuid'] = "FRIEND_UUID";
$body['shareloc'] = true;

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"share_loc_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "shareloc" : true};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    "action":"share_loc_friend", "user_uuid" : "MY_UUID", "friend_uuid" : "FRIEND_UUID", "shareloc" : true
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

AR위치를 보낼 친구를 선택 또는 해제 합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'share_loc_friend'를 입력합니다.
friend_uuid | AR위치를 보낼 친구의 user_uuid 값을 입력합니다.
shareloc | 보낼 대상으로 선택하면 true, 그렇지 않으면 false를 입력합니다.



#두근거림 보내고 받기

## 소켓 접속 정보
서버 소켓에 접속하면 Push를 통해 받게 되는 (이벤트)정보를 소켓을 통해 받을 수 있게 됩니다.
만약 소켓 연결이 해제될 경우, Push를 통해 (이벤트)정보를 받을 수 있습니다.
이에, Heart를 주고/받는 화면에 진입하면 소켓에 접속하고 해당 화면을 빠져 나올 경우 소켓 접속을 해제해 주세요.  

접속 URL : wss://drp326sta1.execute-api.ap-northeast-2.amazonaws.com/prod

헤더 파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.


## 두근거림 보내기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"touch", "friend_uuids":["FRIEND_UUID_1","FRIEND_UUID_2"], "pattern_uuid" : "PATTERN_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'touch';
$body['user_uuid'] = 'USER_UUID';
$body['pattern_uuid'] = 'PATTERN_UUID';
$body['friend_uuids'] = array("FRIEND_UUID_1", "FRIEND_UUID_2");

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "touch", "user_uuid" : "USER_UUID", "pattern_uuid" : "PATTERN_UUID", "friend_uuids" : ["FRIEND_UUID_1", "FRIEND_UUID_2"]};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'touch',
    'user_uuid' : 'USER_UUID',
    'pattern_uuid' : 'PATTERN_UUID',
    'friend_uuids' : ['FRIEND_UUID_1', 'FRIEND_UUID-2']
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success"
  }
```

(소켓연결이 되어 있지 않을 경우)친구에게 나의 두근거림을 전송합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'touch'를 입력합니다.
friend_uuids | 두근거림을 전송할 친구의 user_uuid를 입력합니다. (배열)
pattern_uuid | 두근거림의 패턴 pattern_uuid를 입력합니다. 입력하지 않으면 기본 패턴이 전송됩니다. (두근거림 패턴 등록하기 참고) (Optional)


## 두근거림 전송을 중지하기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "heartcount" : "20", "action":"up", "friend_uuids":["FRIEND_UUID_1", "FRIEND_UUID_2"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'up';
$body['user_uuid'] = 'USER_UUID';
$body['heartcount'] = '20';
$body['friend_uuids'] = array("FRIEND_UUID_1", "FRIEND_UUID_2");

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "up", "user_uuid" : "USER_UUID", "heartcount":"20", "friend_uuids" : ["FRIEND_UUID_1", "FRIEND_UUID_2"]};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'up',
    'user_uuid' : 'USER_UUID',
    'heartcount' : '20',
    'friend_uuids' : ['FRIEND_UUID_1', 'FRIEND_UUID_2']
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success"
  }
```

(소켓연결이 되어 있지 않을 경우) 친구에게 보내던 두근거림의 전송을 중지합니다

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'up'을 입력합니다.
heartcount | 전송한 두근거림 수를 입력합니다.
friend_uuids | 두근거림을 전송하던 친구들의 user_uuid 목록(배열)


#두근거림 패턴 등록/받기/삭제

## 두근거림 패턴 등록/수정하기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"patternupload", "pattern":[0,100,5,100], "pattern_name" : "MY PATTERN NAME", "bpm" : 120, "image_idx" : 2}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'patternupload';
$body['user_uuid'] = 'USER_UUID';
$body['pattern'] = array(0,100,5,100);
$body['pattern_name'] = 'MY PATTERN NAME';
$body['bpm'] = 120;
$body['image_idx'] = 2;

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "patternupload", "user_uuid" : "USER_UUID", "pattern" : [0,100,5,100], "pattern_name" : "MY PATTERN NAME", "bpm" : 120, "image_idx" : 2};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'patternupload',
    'user_uuid' : 'USER_UUID',
    'pattern' : [0,100,5,100],
    'pattern_name' : 'MY PATTERN NAME',
    'bpm' : 120,
    'image_idx' : 2
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success",
    "pattern_uuid":"PATTERN_UUID"
  }
```

나의 두근거림 패턴을 등록합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'patternupload'를 입력합니다.
pattern | 진동패턴 값을 입력합니다.(배열 / 하기'참고'의 내용을 참고해주세요)
pattern_name | 패턴의 이름을 입력합니다.
bpm | 분당심박수(long)
image_idx | 패턴 이미지(감정)의 인덱스 값(integer)
pattern_uuid | 이 값을 지정하면 동일한 pattern_uuid 값을 가지는 패턴을 업데이트 합니다. (optional)

### 응답

파라메터 | 설명
--------- | -----------
pattern_uuid | 등록된 두근거림 패턴의 pattern_uuid

### 참고
진동패턴의 모습은 아래와 같습니다.

`[대기시간,진동시간,대기시간,진동시간, ...]`

예제:
`[100,200,100,300,10,500]`


## 두근거림 패턴 가져오기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"pattern", "friend_uuid":"FRIEND_UUID", "pattern_uuid":"PATTERN_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'pattern';
$body['user_uuid'] = 'USER_UUID';
$body['friend_uuid'] = 'FRIEND_UUID';
$body['pattern_uuid'] = 'PATTERN_UUID';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"user_uuid":"USER_UUID", "action":"pattern", "friend_uuid":"FRIEND_UUID", "pattern_uuid":"PATTERN_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'pattern',
    'user_uuid' : 'USER_UUID',
    'friend_uuid' : 'FRIEND_UUID',
    'pattern_uuid' : 'PATTERN_UUID'
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success",
    "pattern":[0,100,2,100],
    "pattern_uuid":"PATTERN_UUID",
    "pattern_name":"PATTERN_NAME",
    "bpm" : 120, // 이 오브젝트가 존재하지 않을 경우 0으로 초기화
    "image_idx" : 2 //이 오브젝트가 존재하지 않을 경우 8로 초기화
  }
```

친구의 두근거림 패턴을 내려 받습니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'pattern'을 입력합니다.
friend_uuid | 두근거림 패턴을 가지고 있는 친구의 user_uuid
pattern_uuid | 내려받을 두근거림 패턴의 pattern_uuid

### 응답

파라메터 | 설명
--------- | -----------
pattern | 진동 패턴 (배열)
pattern_uuid | 두근거림 패턴의 pattern_uuid
pattern_name | 두근거림 패턴의 이름
image_idx | 패턴 이미지 인덱스 (int)
bpm | 분당심박수 (long)



### 참고
진동패턴의 모습은 아래와 같습니다.

`[대기시간,진동시간,대기시간,진동시간, ...]`

예제:
`[100,200,100,300,10,500]`

웹브라우저와 웹뷰등에서 Javascript를 통해 진동을 표현할 경우, 패턴의 순서에 유의해 주세요.
즉, '두근거림 패턴 가져오기' API를 이용해서 패턴을 내려 받았을 경우, Javascript에서 진동을 표현하기 위해서는 패턴의 첫번째 아이템을 삭제한 후 사용하면 됩니다.

예제:
`var pattern = downloaded_pattern.shift();`


웹브라우저, 웹뷰에서 두근거림 패턴을 사용하는 방법은 아래의 경로를 참고해 주세요.

- <a href=https://dev.dkdk.io/example/index.html#example1 target=new>https://dev.dkdk.io/example/index.html#example1</a>


iOS의 Cordova 환경에서 두근거림 패턴을 사용하는 방법은 아래의 경로를 참고해 주세요.

- <a href=https://dev.dkdk.io/example/index.html#example2 target=new>https://dev.dkdk.io/example/index.html#example2</a>


## 두근거림 패턴 삭제하기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"patternremove", "pattern_uuid":"PATTERN_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'patternremove';
$body['user_uuid'] = 'USER_UUID';
$body['pattern_uuid'] = 'PATTERN_UUID';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"user_uuid":"USER_UUID", "action":"patternremove", "pattern_uuid":"PATTERN_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'patternremove',
    'user_uuid' : 'USER_UUID',
    'pattern_uuid' : 'PATTERN_UUID'
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success"
  }
```

나의 두근거림 패턴을 삭제합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'patternremove'를 입력합니다.
pattern_uuid | 삭제할 두근거림 패턴의 pattern_uuid


#AI 기능
## 얼굴표정 분석 요청

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"get_face_emotion", "user_uuid":"USER_UUID",  "language":"LANGUAGE", "imageData" : "BASE64_ENCODED_IMAGE"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'get_face_emotion';
$body['user_uuid'] = 'USER_UUID';
$body['imageData'] = 'MY BASE64_ENCODED_IMAGE NAME';
$body['language'] = 'LANGUAGE';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"get_face_emotion", "user_uuid":"USER_UUID",  "language":"LANGUAGE", "imageData" : "BASE64_ENCODED_IMAGE"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    "action":"get_face_emotion", "user_uuid":"USER_UUID",  "language":"LANGUAGE", "imageData" : "BASE64_ENCODED_IMAGE"
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success",
    "response" : [
      {
        "exp" : "행복해 보여요",
        "emotion" : "happy",
        "val" : 0.8
      },
      {
        "exp" : "슬픈가 보다",
        "emotion" : "sad",
        "val" : 0.5
      },
      {
        "exp" : "화가났냐?",
        "emotion" : "angry",
        "val" : 0.2
      }
    ],
    "emotion" : "happy"
  }

  //실패시 (감정분석 실패)
  {
    "result":"failed",
    "emotion" : "none"
  }
```

얼굴 이미지를 전송하여 분석한 감정 상태 값을 받습니다

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'get_face_emotion'를 입력합니다.
imageData | Base64로 인코딩된 이미지(JPG) 데이터
language | 사용자 디바이스의 언어값 (ISO 639 aplha-2 또는 aplha-3 코드 - 한국어: ko, 영어: en, 일어: ja, ...)



#사용자 정보 읽기/관리

## 친구요청 수신 기록 가져오기 [DEPRECATED]

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"get_requests", "user_uuid" : "MY_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'get_requests';
$body['user_uuid'] = 'MY_UUID';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "get_requests", "user_uuid" : "MY_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'get_requests',
    'user_uuid' : 'USER_UUID'
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
{
  "result": "success",
  "data": [
      {
          "user_nickname": "USER_NICKNAME",
          "user_uuid": "USER_UUID",
          "created": 1575355454328
      },
      {
          "user_nickname": "USER_NICKNAME2",
          "user_uuid": "USER_UUID2",
          "created": 1575357228660
      }
  ]
}
```

(서버에 기록되어 있는) 수신한 친구요청 기록 가져옵니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'get_requests'를 입력합니다.



## 친구요청 수신 기록 삭제하기 [DEPRECATED]

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"remove_requests", "user_uuid" : "MY_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'remove_requests';
$body['user_uuid'] = 'MY_UUID';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "remove_requests", "user_uuid" : "MY_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'remove_requests',
    'user_uuid' : 'USER_UUID'
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

(서버에 기록되어 있는) 수신한 친구요청 기록 모두를 삭제합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'remove_requests'를 입력합니다.


## 닉네임 수정

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"update_nickname", "user_uuid" : "USER_UUID", "user_nickname" : "USER_NICKNAME"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'update_nickname';
$body['user_uuid'] = 'MY_UUID';
$body['user_nickname'] = "USER_NICKNAME";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"update_nickname", "user_uuid" : "USER_UUID", "user_nickname" : "USER_NICKNAME"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action':'update_nickname', 'user_uuid' : 'USER_UUID', 'user_nickname' : 'USER_NICKNAME'
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

내 프로필 닉네임 정보를 수정 합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'update_nickname'을 입력합니다.
user_nickname | 사용자가 입력한 닉네임


## 이미지 업로드

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"action":"deviceid", "device_id" : "DEVICE_PUSH_TOKEN", "user_uuid" : "USER_UUID", "user_nickname" : "USER_NICKNAME", "version" : "VERSION_CODE", "imageData" : "BASE64_ENCODED_IMAGE"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'deviceid';
$body['user_uuid'] = 'MY_UUID';
$body['device_id'] = 'DEVICE_PUSH_TOKEN';
$body['user_nickname'] = "USER_NICKNAME";
$body['version'] = "VERSION_CODE";
$body['imageData'] = "BASE64_ENCODED_IMAGE";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action":"deviceid", "device_id" : "DEVICE_PUSH_TOKEN", "user_uuid" : "USER_UUID", "user_nickname" : "USER_NICKNAME", "version" : "VERSION_CODE", "imageData" : "BASE64_ENCODED_IMAGE"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action':'deviceid', 'device_id' : 'DEVICE_PUSH_TOKEN', 'user_uuid' : 'USER_UUID', 'user_nickname' : 'USER_NICKNAME', 'version' : 'VERSION_CODE', 'imageData' : 'BASE64_ENCODED_IMAGE'
}
url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 API는 요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

내 디바이스의 정보를 업로드/갱신 합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'deviceid'를 입력합니다.
device_id | 푸시전송시 사용하는 토큰
user_nickname | 사용자가 입력한 닉네임
version | 앱의 버전 (android에서의 VERSION_CODE와 동일값)
imageData | base64 로 인코딩된 사용자 이미지




## 주고받은 두근거림(Heart)수 받아오기

```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"history", "friend_uuid" : "FRIEND_UUID"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'history';
$body['user_uuid'] = 'USER_UUID';
$body['friend_uuid'] = 'FRIEND_UUID';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DKDKTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v2/dkdk');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "history", "user_uuid" : "USER_UUID", "friend_uuid" : "FRIEND_UUID"};

$.ajax({url : "https://api.dkdk.io/v2/dkdk",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DKDKTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DKDKTOKEN'
}
data = {
    'action': 'history',
    'user_uuid' : 'USER_UUID',
    'friend_uuid' : 'FRIEND_UUID'
}

url = 'https://api.dkdk.io/v2/dkdk'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
{
 "result" : "success",
 "sentdata" : [
{
  "count":"5",
  "time":"2018-03-27 22:47:30"
},
{
  "count":"12",
  "time":"2018-03-28 01:04:45"
}
 ],
 "recvdata" : [
{
  "count":"37",
  "time":"2018-03-27 22:47:30"
},
{
  "count":"83",
  "time":"2018-03-28 01:04:45"
}
 ]
}
```

나의 친구가 주고받은 두근거림(Heart)의 수를 확인합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token 값을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'history'를 입력합니다.
friend_uuid | 친구의 user_uuid를 입력합니다.


### 응답

파라메터 | 설명
--------- | -----------
sentdata | 보낸 두근거림 수 정보가 담긴 배열
recvdata | 받은 두근거림 수 정보가 담긴 배열
count | 두근거림 수
time | 두근거림을 보내거나 받은 시각


#웹소켓을 통해 이벤트 보내기

## 웹소켓 접속하기

```shell

$wscat -c wss://socketinterface.dkdk.io/v2 -h dkdk-token:MYTOKEN -h user_uuid:MY_UUID
Connected (press CTRL+C to quit)

```

웹소켓 서버에 접속합니다.
(두근거림 주고받기 화면을 띄웠을 경우 접속하고, 화면을 종료 할 경우 연결을 끊는 것이 좋습니다.)

### WebSocket 요청

`wss://socketinterface.dkdk.io/v2`

### 헤더 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 사용자 Token을 헤더에 입력합니다.
user_uuid | 사용자 등록 후 부여받는 user_uuid를 헤더에 입력합니다.

## heart 보내기

```shell

$wscat -c wss://socketinterface.dkdk.io/v2 -H dkdk-token:MYTOKEN -H user_uuid:MY_UUID
Connected (press CTRL+C to quit)
{"action": "sendMessage", "user_uuid":"USER_UUID", "user_nickname" : "USER_NICKNAME", "doaction":"heart", "friend_uuids":["FRIEND_UUID1"], "pattern_uuid":"PATTERN_UUID", "friend_shareloc_uuids" : ["FRIEND_UUID1", "FRIEND_UUID2"], "lat" : 123.1341, "lng" : 36.134, "alt" : 12.33}
```

웹소켓 서버로 heart이벤트를 전송합니다.
(heart를 주고 받는 애니메이션의 간격을 5초로 설정합니다. 나의 heart가 5초후에 상대에게 도달할때마다 이 API를 호출합니다.
마찬가지로, heart를 수신하고 있는 상대방은 약 10초 간격으로 수신여부를 확인하고 만약 10초동안 수신한 기록이 없다면 상대로 부터 'up' 이벤트를 받은 것으로 간주하고 처리합니다.)

### 파라메터

파라메터 | 설명
--------- | -----------
user_uuid | 사용자 등록 후 부여받는 user_uuid 값을 입력합니다.
action | 'sendMessage'를 입력합니다.
doaction | 'heart'를 입력합니다.
user_nickname | 사용자 닉네임을 입력합니다 (Optional)
friend_uuids | 친구의 user_uuid를 입력합니다. (Array)
friend_shareloc_uuids |  내 AR위치를 전송받을 친구의 user_uuid를 입력합니다. (Array)
pattern_uuid | 패턴 UUID를 입력합니다. 입력하지 않을 경우 사용자의 패턴들 중 첫번째 패턴의 UUID가 입력됩니다.
lat | 위도(Latitude) 좌표를 입력합니다 (double)
lng | 경도(Longitude) 좌표를 입력합니다 (double)
alt | 고도(Altitude) 값을 입력합니다 (double)


#친구 요청/터치/터치업/heart 이벤트받기

## 친구요청 받기 [DEPRECATED]

```http

POST / HTTP/1.1
Host: YOUR-HOST-NAME
Accept: application/json
User-Agent: DKDK Service
Content-Type: application/json
Connection: close

{
  "state":"request",
  "from":"USER_NICKNAME",
  "fromid":"USER_UUID",
  "curdate":"2014-03-01 15:00:00"
}

```
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"request",
    "mfrom":"USER_NICKNAME",
    "muuid":"USER_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

  //TIZEN, HTTP SERVER
  {
    "state":"request",
    "from":"USER_NICKNAME",
    "fromid":"USER_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

```

지인으로 부터 친구요청을 받습니다.

### 친구요청 수신 데이터 (ANDROID, iOS) [DEPRECATED]

파라메터 | 설명
--------- | -----------
mstate | 'request'
mfrom | 친구의 닉네임
muuid | 친구의 user_uuid
curdate | 친구요청 송신 시각

### 친구요청 수신 데이터 (TIZEN, HTTP SERVER) [DEPRECATED]

파라메터 | 설명
--------- | -----------
state | 'request'
from | 친구의 닉네임
fromid | 친구의 user_uuid
curdate | 친구요청 송신 시각



## Heart터치 이벤트받기

```http

POST / HTTP/1.1
Host: YOUR-HOST-NAME
Accept: application/json
Content-Type: application/json
User-Agent: DKDK Service
Connection: close

{
  "state":"touch",
  "from":"USER_NICKNAME",
  "fromid":"USER_UUID",
  "pattern_uuid":"PATTERN_UUID",
  "curdate":"2014-03-01 15:00:00"
}

```
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"touch",
    "mfrom":"USER_UUID",
    "muuid":"USER_UUID",
    "mid":"USER_NICKNAME",
    "pattern_uuid":"PATTERN_UUID",
    "curdate":"2014-03-01 15:00:00",
  }

  //TIZEN, HTTP SERVER
  {
    "state":"touch",
    "from":"USER_NICKNAME",
    "fromid":"USER_UUID",
    "pattern_uuid":"PATTERN_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

```

친구가 Heart를 터치하면 이 이벤트를 받습니다.

### Heart터치 수신 데이터 (ANDROID, iOS)

파라메터 | 설명
--------- | -----------
mstate | 'touch'
mfrom | 친구의 user_uuid
mid | 친구의 닉네임
muuid | 친구의 user_uuid
pattern_uuid | 친구의 패턴 UUID
curdate | Heart터치 송신 시각

### Heart터치 수신 데이터 (TIZEN, HTTP SERVER)

파라메터 | 설명
--------- | -----------
state | 'touch'
from | 친구의 닉네임
fromid | 친구의 user_uuid
pattern_uuid | 친구의 패턴 uuid
curdate | Heart터치 송신 시각


## Heart터치업 이벤트받기

```http

POST / HTTP/1.1
Host: YOUR-HOST-NAME
Accept: application/json
Content-Type: application/json
User-Agent: DKDK Service
Connection: close

{
  "state":"up",
  "from":5,
  "fromid":"USER_UUID",
  "curdate":"2014-03-01 15:00:00"
}

```
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"up",
    "mfrom":5,
    "muuid":"USER_UUID",
    "mid":"USER_NICKNAME",
    "curdate":"2014-03-01 15:00:00"
  }

  //TIZEN, HTTP SERVER
  {
    "state":"up",
    "from":5,
    "fromid":"USER_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

```

친구가 터치중인 Heart에서 손을 떼면 이 이벤트를 받습니다.

### Heart터치업 수신 데이터 (ANDROID, iOS)

파라메터 | 설명
--------- | -----------
mstate | 'up'
mfrom | 터치부터 터치업까지의 두근거림 수
muuid | 친구의 user_uuid
curdate | 이벤트 송신 시각

### Heart터치업 수신 데이터 (TIZEN, HTTP SERVER)

파라메터 | 설명
--------- | -----------
state | 'up'
from | 터치부터 터치업까지의 두근거림 수
fromid | 친구의 user_uuid
curdate | 이벤트 송신 시각

## heart 이벤트받기

```http

POST / HTTP/1.1
Host: YOUR-HOST-NAME
Accept: application/json
Content-Type: application/json
User-Agent: DKDK Service
Connection: close

{
  "mstate":"heart",
  "muuid":"USER_UUID",
  "state":"heart",
  "user_nickname":"USER_NICKNAME",
  "pattern_uuid":"PATTERN_UUID",
  "curdate":"2014-03-01 15:00:00",
  "lat":123.132314,
  "lng":36.314123421,
  "alt":12.33
}

```
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"heart",
    "muuid":"USER_UUID",
    "user_nickname":"USER_NICKNAME",
    "pattern_uuid":"PATTERN_UUID",
    "curdate":"2014-03-01 15:00:00",
    "lat":123.132314,
    "lng":36.314123421,
    "alt":12.33
  }

  //TIZEN, HTTP SERVER
  {
    "state":"touch",
    "fromid":"USER_UUID",
    "user_nickname":"USER_NICKNAME",
    "pattern_uuid":"PATTERN_UUID",
    "curdate":"2014-03-01 15:00:00",
    "lat":123.132314,
    "lng":36.314123421,
    "alt":12.33
  }

```

친구가 Heart를 터치하는 동안 이 이벤트를 받습니다.

### heart 수신 데이터 (ANDROID, iOS)

파라메터 | 설명
--------- | -----------
mstate | 'heart'
user_nickname | 친구의 닉네임
muuid | 친구의 user_uuid
pattern_uuid | 친구의 패턴 UUID
curdate | heart 송신 시각
lat | 위도(Latitude) 좌표 (double)
lng | 경도(Longitude) 좌표 (double)
alt | 고도(Altitude) 값 (double)

### heart 수신 데이터 (TIZEN, HTTP SERVER)

파라메터 | 설명
--------- | -----------
state | 'heart'
user_nickname | 친구의 닉네임
fromid | 친구의 user_uuid
pattern_uuid | 친구의 패턴 uuid
curdate | heart 송신 시각
lat | 위도(Latitude) 좌표 (double)
lng | 경도(Longitude) 좌표 (double)
alt | 고도(Altitude) 값 (double)



#푸시 메시지

## 사용자 토큰(dkdk-token)값 전송
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"secret",
    "mfrom":"DKDK_TOKEN",
    "muuid":"FRIEND_UUID",
    "mid":"FRIEND_NICKNAME",
    "curdate":"2014-03-01 15:00:00"
  }

  //TIZEN, HTTP SERVER
  {
    "state":"secret",
    "from":"DKDK_TOKEN",
    "fromid":"FRIEND_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

```

## 친구 요청 수신 [DEPRECATED]
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"request",
    "muuid":"FRIEND_UUID",
    "mfrom":"FRIEND_NICKNAME",
    "curdate":"2014-03-01 15:00:00"
  }

  //TIZEN, HTTP SERVER
  {
    "state":"request",
    "fromid":"FRIEND_UUID",
    "mfrom":50, //수신한 전체 Heart의 수
    "curdate":"2014-03-01 15:00:00"
  }

```

## 두근거림 수신시: 터치(TOUCH)시
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"touch",
    "muuid":"FRIEND_UUID",
    "mid":"FRIEND_NICKNAME",
    "pattern_uuid":"PATTERN_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

  //TIZEN, HTTP SERVER
  {
    "state":"secret",
    "fromid":"FRIEND_UUID",
    "pattern_uuid":"PATTERN_UUID",
    "curdate":"2014-03-01 15:00:00"
  }

```

## 두근거림 수신 종료시 : 업(UP)시
> JSON 구조로 송신합니다:

```json

  //ANDROID, iOS
  {
    "mstate":"up",
    "muuid":"USER_UUID",
    "mid":"USER_NICKNAME",
    "mfrom":50, //수신한 전체 Heart의 수
    "curdate":"2014-03-01 15:00:00"
  }

  //TIZEN, HTTP SERVER
  {
    "state":"secret",
    "fromid":"USER_UUID",
    "mfrom":50, //수신한 전체 Heart의 수
    "curdate":"2014-03-01 15:00:00"
  }

```
