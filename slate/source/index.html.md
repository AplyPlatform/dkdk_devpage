---
title: DKDK Open API Reference

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
  - © 2019 <a href='httpi://aply.biz'>APLY Inc.</a>
includes:
  - errors

search: true
---

# 소개

'오늘도 어제처럼 두근두근'

두근두근 Open API의 사용 설명서입니다.
인터넷이 지원되는 디바이스에서 친구나 지인의 두근두근 앱으로 두근거림을 보내거나 받을 수 있는 방법을 설명합니다.

<img src="../imgs/dkdk_open_api.png" class="imgstyle">

Open API를 사용하는 첫번째 예제 입니다.
내가 만든 어떤 특별한 장치에서 친구의 스마트폰에 있는 두근두근으로 두근거림을 보낼 수 있습니다.

<img src="../imgs/dkdk_open_api-2.png" class="imgstyle">

Open API를 사용하는 두번째 예제 입니다.
친구가 스마트폰의 두근두근을 터치할 경우 내가 만든 장치에서 두근거림을 받을 수 있습니다.


# Token 발급 받기

> Open API 의 사용을 위해 DKDK 개발자 Token을 발급 받으세요.


```shell

```

```php

```

```javascript

```

```python

```


>

DKDK Open API는 DKDK 개발자 Token을 파라메터로 입력해야 사용하실 수 있습니다.
아래 경로에서 먼저 개발자Token을 발급 받으세요.

[DKDK 개발자Token 발급](https://dev.dkdk.io/).

발급받은 Token의 사용방법은 각 Open API의 설명을 참고해 주세요.

<aside class="notice">
DKDK Open API를 사용하시려면 반드시 <code>Token</code>을 API의 파라메터로 입력해야 합니다. 간수에 유의해 주세요.
</aside>

# 친구 요청/수락/헤어지기

## 친구요청 보내기

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

> 상기의 API는 친구요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success",
    "friend_uuid": "FRIEND_UUID"
  }
```

친구요청을 보냅니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'request'를 입력합니다.
friend_nickname | 친구요청을 전송할 대상의 닉네임을 입력합니다.

<aside class="warning">
Token의 노출에 유의하세요!
</aside>

## 친구요청 수락하기


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
  "result" : "success"
}

```

친구요청을 수락합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
action | 'accept'를 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
friend_uuid | 친구요청 전송에 성공했을때 수신한 friend_uuid를 입력합니다.

## 친구와 헤어지기

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

친구와 헤어지기 요청을 전송합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'bye'를 입력합니다.
friend_uuid | 친구요청 전송에 성공했을때 수신한 friend_uuid 값을 입력합니다.


#두근거림 보내고 받기

## 두근거림 패턴 보내기


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

친구에게 나의 두근거림을 전송합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'touch'를 입력합니다.
friend_uuids | 두근거림을 전송할 친구의 user_uuid를 입력합니다. (배열)
pattern_uuid | 두근거림의 패턴 pattern_uuid를 입력합니다. 입력하지 않으면 기본 패턴이 전송됩니다. (두근거림 패턴 등록하기 참고) (Optional)


## 두근거림 전송을 중지하기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"up", "friend_uuids":["FRIEND_UUID_1", "FRIEND_UUID_2"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'up';
$body['user_uuid'] = 'USER_UUID';
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

var jdata = {"action": "up", "user_uuid" : "USER_UUID", "friend_uuids" : ["FRIEND_UUID_1", "FRIEND_UUID_2"]};

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

친구에게 보내던 두근거림의 전송을 중지합니다

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'up'을 입력합니다.
friend_uuids | 두근거림을 전송하던 친구들의 user_uuid 목록(배열)


# 두근거림 보낼 대상 선택/해제

## 보낼 대상 선택/해제하기

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

> 상기의 API는 친구요청에 성공했을 경우 아래와 같이 JSON 구조로 응답합니다:

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
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'target_friend'를 입력합니다.
friend_uuid | 두근거림을 보낼 친구의 user_uuid 값을 입력합니다.
target | 보낼 대상으로 선택하면 true, 그렇지 않으면 false를 입력합니다.

#두근거림 패턴 등록/받기/삭제

## 두근거림 패턴 등록하기


```shell

curl -H "dkdk-token: DKDKTOKEN" -H "Content-type: application/json" -X POST -d '{"user_uuid":"USER_UUID", "action":"patternupload", "pattern":[0,100,5,100], "pattern_name" : "MY PATTERN NAME"}' https://api.dkdk.io/v2/dkdk

```

```php

$body['action'] = 'patternupload';
$body['user_uuid'] = 'USER_UUID';
$body['pattern'] = array(0,100,5,100);
$body['pattern_name'] = 'MY PATTERN NAME';

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

var jdata = {"action": "patternupload", "user_uuid" : "USER_UUID", "pattern" : [0,100,5,100], "pattern_name" : "MY PATTERN NAME"};

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
    'pattern_name' : 'MY PATTERN NAME'
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

나의 두근거림 패턴을 등록합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'patternupload'를 입력합니다.
pattern | 진동패턴 값을 입력합니다.(배열 / 하기'참고'의 내용을 참고해주세요)
pattern_name | 패턴의 이름을 입력합니다.


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
    "pattern_name":"PATTERN_NAME"
  }
```

친구의 두근거림 패턴을 내려 받습니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'pattern'을 입력합니다.
friend_uuid | 두근거림 패턴을 가지고 있는 친구의 user_uuid
pattern_uuid | 내려받을 두근거림 패턴의 pattern_uuid

### 응답

파라메터 | 설명
--------- | -----------
pattern | 진동 패턴 (배열)
pattern_uuid | 두근거림 패턴의 pattern_uuid
pattern_name | 두근거림 패턴의 이름



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
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'patternremove'를 입력합니다.
pattern_uuid | 삭제할 두근거림 패턴의 pattern_uuid


#두근거림 기록 받기

## 주고받은 두근거림(하트)수 받아오기


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

나의 친구가 주고받은 두근거림(하트)의 수를 확인합니다.

### HTTP 요청

`POST https://api.dkdk.io/v2/dkdk`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'history'를 입력합니다.
friend_uuid | 친구의 user_uuid를 입력합니다.


### 응답

파라메터 | 설명
--------- | -----------
sentdata | 보낸 두근거림 수 정보가 담긴 배열
recvdata | 받은 두근거림 수 정보가 담긴 배열
count | 두근거림 수
time | 두근거림을 보내거나 받은 시각

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
dkdk-token | 개발자 Token 값을 헤더에 입력합니다.
user_uuid | <a href="https://center.dkdk.io/">두근두근 개발자 센터</a>에서 디바이스를 등록한 후 부여받는 user_uuid 값을 입력합니다.
action | 'get_face_emotion'를 입력합니다.
imageData | Base64로 인코딩된 이미지(JPG) 데이터
language | 사용자 디바이스의 언어값 (ISO 639 aplha-2 또는 aplha-3 코드 - 한국어: ko, 영어: en, 일어: ja, ...)


#친구 요청/터치/터치업 신호받기

## 친구요청 받기

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

### 친구요청 수신 데이터 (ANDROID, iOS)

파라메터 | 설명
--------- | -----------
mstate | 'request'
mfrom | 친구의 닉네임
muuid | 친구의 user_uuid
curdate | 친구요청 송신 시각

### 친구요청 수신 데이터 (TIZEN, HTTP SERVER)

파라메터 | 설명
--------- | -----------
state | 'request'
from | 친구의 닉네임
fromid | 친구의 user_uuid
curdate | 친구요청 송신 시각



## 하트터치 신호받기

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
    "curdate":"2014-03-01 15:00:00"
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

친구가 하트를 터치하면 이 신호를 받습니다.

### 하트터치 수신 데이터 (ANDROID, iOS)

파라메터 | 설명
--------- | -----------
mstate | 'touch'
mfrom | 친구의 user_uuid
mid | 친구의 닉네임
muuid | 친구의 user_uuid
pattern_uuid | 친구의 패턴 UUID
curdate | 하트터치 송신 시각

### 하트터치 수신 데이터 (TIZEN, HTTP SERVER)

파라메터 | 설명
--------- | -----------
state | 'touch'
from | 친구의 닉네임
fromid | 친구의 user_uuid
pattern_uuid | 친구의 패턴 uuid
curdate | 하트터치 송신 시각




## 하트터치업 신호받기

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

친구가 터치중인 하트에서 손을 떼면 이 신호를 받습니다.

### 하트터치업 수신 데이터 (ANDROID, iOS)

파라메터 | 설명
--------- | -----------
mstate | 'up'
mfrom | 터치부터 터치업까지의 두근거림 수
muuid | 친구의 user_uuid
curdate | 신호 송신 시각

### 하트터치업 수신 데이터 (TIZEN, HTTP SERVER)

파라메터 | 설명
--------- | -----------
state | 'up'
from | 터치부터 터치업까지의 두근거림 수
fromid | 친구의 user_uuid
curdate | 신호 송신 시각
