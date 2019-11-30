

function getUserNetwork() {    
    var token = getCookie("user_token");
    var emailid = getCookie("dev_user_id");    

    var jdata = {
      "daction": "admin_user_network",
      "emailid" : emailid,
      "token" : token,      
      "action" : "developer"};

    ajaxRequest(jdata, function (r) {
      if(r.result == "success") {
        if (r.data.length > 0) {          
          addNetworkList(r.data);
          hideLoader();
        }
        else {          
          hideLoader();
        }
      }else {        
        hideLoader();
      }
    }, function(request, status, error) {
      hideLoader();
      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    });
}

function addNetworkList(edate) 
{
	  var g = new Dracula.Graph();

		edate.forEach(function(element){    	
    	g.addEdge(element[0], element[1]);
		});		
		
		var layouter = new Dracula.Layout.Spring(g);
		layouter.layout();
		
		var renderer = new Dracula.Renderer.Raphael('#usernetwork', g, 400, 300);
		renderer.draw();
}

function initAdmin() {
	getUserNetwork();  
}



initAdmin();
