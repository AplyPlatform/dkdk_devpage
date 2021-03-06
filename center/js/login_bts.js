function fbLoginCheck() {
  checkFacebookLogin();
};

function checkFacebookLogin() {
  FB.getLoginStatus(function(response) {
    var skind = getCookie("dev_kind");
    if (skind != "facebook") return;
    //statusChangeCallback(response);
    if (response.status == "connected") {
      var token = response.authResponse.accessToken;
      if (token != null && token != "")
        formSubmit(token);
    }
  });
}


function googleinit() {
  gapi.load('auth2', function() { // Ready.
    gapi.auth2.init();
  });
}

function googleSignInCallback(googleUser) {
  var skind = getCookie("dev_kind");
  if (skind != "google") return;

  var token = googleUser.getAuthResponse().id_token;
  formSubmit(token);
}


function naverinit() {
  var naverLogin = new naver.LoginWithNaverId(
      {
        clientId: "5SEPqM8g94jKlpGeUAep",
        callbackUrl: "https://dev.dkdk.io/center/navercallback.html",
        isPopup: false,
        loginButton: {color: "green", type: 3, height: 35}
      }
    );
  /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
  naverLogin.init();
}


function naverSignInCallback(token) {
  var skind = getCookie("dev_kind");
  if (skind != "naver") return;
  formSubmit(token);
}

function showLoader() {
  $("#loading").show();
}

function hideLoader() {
  $("#loading").fadeOut(800);
}


function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}


function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}


function ajaxRequest(data, callback, errorcallback) {
    $.ajax({url : "https://api.dkdk.io/v2/dkdk",
           dataType : "json",
           crossDomain: true,
           cache : false,
           data : JSON.stringify(data),
           type : "POST",
           contentType: "application/json; charset=utf-8",
           async: false,
           success : function(r) {
             console.log(JSON.stringify(r));
             callback(r);
           },
           error:function(request,status,error){
               console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
               errorcallback(request,status,error);
           }
    });
}

function isSet(value) {
  if (value == "" || value == null || value == "undefined") return false;

  return true;
}

function formSubmit(token) {
  var skind = getCookie("dev_kind");
  var jdata = {
    action: "developer",
    daction: "login",
    token : token,
    kind : skind
  };

  ajaxRequest(jdata, function (r) {
    if(r.result == "success") {
      setCookie("dev_user_id", r.emailid, 1);
      setCookie("socialid", r.socialid, 1);
      setCookie("user_token", r.token, 1);
      setCookie("map_key", r.map_key, 1);
      setCookie("device_table_uuid", r.device_table_uuid, 1);
      location.href="center.html";
    }else {
      hideLoader();
      alert("등록된 아이디가 없습니다. / " + r.reason);
      setCookie("temp_user_id", r.fid)
      location.href="register.html";
    }
  }, function(request, status, error) {
    hideLoader();
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  });

}

function checkLoginStatus() {
  $("#fbLoginButton").hide();
  $("#naverIdLogin").hide();
  $("#googleLoginButton").hide();

  var dev_user_id = getCookie("dev_user_id");
  if (isSet(dev_user_id) == true) {
    location.href="center.html";
    return;
  }
  else {
    var dev_kind = getCookie("dev_kind");
    if (isSet(dev_kind) == false) {
      setCookie("dev_user_id", '', -1);
      location.href="index.html";
      return;
    }

    if (dev_kind == "facebook") {
      $("#fbLoginButton").show();
      fbLoginCheck();
    }
    else if (dev_kind == "google") {
      $("#googleLoginButton").show();
      googleinit();
    }
    else if (dev_kind == "naver") {
      $("#naverIdLogin").show();
      naverinit();
    }
  }
}

checkLoginStatus();
