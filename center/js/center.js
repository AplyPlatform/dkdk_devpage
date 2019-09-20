
function logOut() {
  setCookie("dev_user_id", "", -1);
  setCookie("socialid", "", -1);
  setCookie("user_token", "", -1);
  setCookie("device_table_uuid", "", -1);
  location.href="index.html";
}

function requestUserRemove() {
  showLoader();
  var token = getCookie("user_token");
  var emailid = getCookie("dev_user_id");
  var user_nickname = $('#user_nickname').val();

  if (user_nickname == "") {
	   alert("사용자의 이름을 입력해 주세요");
     hideLoader();
	   return;
  }

  var jdata = {"daction": "admin_user_remove",
    "user_nickname" : user_nickname,
    "emailid" : emailid,
    "token" : token,
    "action" : "developer"
  };

  ajaxRequest(jdata, function (r) {
    if(r.result == "success") {
      alert(user_nickname + " 사용자를 삭제하였습니다.");
      $('#user_nickname').val("");
    }else {
      hideLoader();
      alert("사용자 삭제에 실패하였습니다. " + r.reason);
    }
  }, function(request, status, error) {
    hideLoader();
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  });
}

function requestDeviceRegister() {
  showLoader();
  var token = getCookie("user_token");
  var emailid = getCookie("dev_user_id");
  var device_table_uuid = getCookie("device_table_uuid");
  var user_nickname = $('#user_nickname').val();
  var device_id = $('#device_id').val();
  var device_kind = $('#device_kind').val();
  var version = $('#version').val();

  if (user_nickname == "") {
	alert("디바이스의 이름을 입력해 주세요");
      	hideLoader();
	return;
  }

  if (device_id == "") {
	alert("신호를 받을 디바이스의 아이디 또는 주소를 입력해 주세요");
      	hideLoader();
	return;
  }


  if (version == "") {
	alert("디바이스의 version을 입력해 주세요");
      	hideLoader();
	return;
  }


  var jdata = {"daction": "device_register",
    "version" : version,
    "device_kind" : device_kind,
    "device_id" : device_id,
    "user_nickname" : user_nickname,
    "emailid" : emailid,
    "token" : token,
    "action" : "developer",
    "device_table_uuid" : device_table_uuid
  };

  ajaxRequest(jdata, function (r) {
    if(r.result == "success") {
      addDeviceList(r.data);
      $('#selDevice').show();
      $('#selDeviceBody').show();
      hideLoader();
      alert(r.data.user_nickname + " 디바이스를 등록하였습니다.");
      $('#user_nickname').val("");
      $('#device_id').val("");
      $('#version').val("")
    }else {
      hideLoader();
      alert("디바이스 등록에 실패하였습니다. " + r.reason);
    }
  }, function(request, status, error) {
    hideLoader();
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  });
}




function requestDeviceRemove(selectValue, selectText) {
    showLoader();

    var r = confirm("정말로 " + selectText + "(" + selectValue + ") 디바이스를 삭제하시겠습니까?");
    if (r == false) {
      hideLoader();
      return;
    }

    var token = getCookie("user_token");
    var emailid = getCookie("dev_user_id");
    var device_table_uuid = getCookie("device_table_uuid");

    var jdata = {"daction": "device_remove",
      user_uuid : selectValue,
      "emailid" : emailid,
      "token" : token,
      "action" : "developer",
      "device_table_uuid" : device_table_uuid
    };

    ajaxRequest(jdata, function (r) {
      if(r.result == "success") {
        alert("디바이스를 삭제하였습니다.");
        removeDiv(selectValue);
        hideLoader();
      }
      else {
        alert("디바이스를 삭제하는데에 실패하였습니다." + r.result);
        hideLoader();
      }
    }, function(request, status, error) {
      hideLoader();
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    });
}


function getDeviceList() {
    $('#selDevice').empty();
    var token = getCookie("user_token");
    var emailid = getCookie("dev_user_id");
    var device_table_uuid = getCookie("device_table_uuid");


    var jdata = {
      "daction": "device_list",
      "emailid" : emailid,
      "token" : token,
      "device_table_uuid" : device_table_uuid,
      "action" : "developer"};

    ajaxRequest(jdata, function (r) {
      if(r.result == "success") {
        if (r.devices.length > 0) {
          $('#selDeviceBody').show();
          $('#selDevice').show();
          appendDeviceList(r.devices);
          hideLoader();
        }
        else {
          $('#selDeviceBody').hide();
          $('#selDevice').hide();
          hideLoader();
        }
      }else {
        $('#selDevice').hide();
        $('#selDeviceBody').hide();
        hideLoader();
      }
    }, function(request, status, error) {
      hideLoader();
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    });
}

function addDeviceList(item) {
    var friendListStr = "friends :<br>";
    if ("friend_uuids" in item) {
        item.forEach(function(fr) {
            friendListStr += "user_uuid: " + fr + "<br>";
        });
    }

    var strNew = "<div id='" + item.user_uuid + "'>"
      + "user_uuid: " + item.user_uuid + "<br>"
      + "user_nickname: " + item.user_nickname + "<br>"
      + "address(push id): " + item.device_id + "<br>"
      + "version: " + item.version + "<br>"
      + "kind: " + item.device_kind + "<br>"
      + friendListStr
      + "<br><a class='btn btn-primary btn-lg active' role='button' onClick='requestDeviceRemove(\"" + item.user_uuid + "\", \"" + item.user_nickname + "\");'>삭제하기</a>"
      + "<br><hr size=1 color=#555></div>";

    $('#selDeviceBody').append(strNew);
}

function removeDiv(uuid) {
  $("#" + uuid).remove();
}


function appendDeviceList(data) {
    if (data == null) return;
    if (data.length == 0) return;

    data.forEach(function (item) {
        addDeviceList(item);
    });
}

function showLoader() {
  $("#loading").show();
}

function hideLoader() {
  $("#loading").fadeOut(800);
}

function ajaxRequest(data, callback, errorcallback) {
    var usertoken = getCookie('user_token');
    $.ajax({url : "https://api.dkdk.io/v2/dkdk",
           dataType : "json",
           crossDomain: true,
           cache : false,
           data : JSON.stringify(data),
           type : "POST",
           contentType: "application/json; charset=utf-8",
           async: false,
           beforeSend: function(request) {
              request.setRequestHeader("dkdk-token", usertoken);
            },
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


function initCenter() {
  var usertoken = getCookie('user_token');
  var socialid = getCookie('socialid');

  if (isSet(usertoken) == false) {
    location.href="index.html";
    return;
  }
  $('#dkdktoken_view').val(getCookie('user_token'));
  $('#socialid_field').html(getCookie('socialid'));

  getDeviceList();
}


function isSet(value) {
  if (value == "" || value == null || value == "undefined") return false;

  return true;
}


initCenter();
