
var currentNetworkData;
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
        	currentNetworkData = r.data;          
        	hideLoader();
        	onlyConnectedNetworkList();          
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


function onlyConnectedNetworkList() 
{		
		showLoader();
	  var g = new Dracula.Graph();
	  
	  var edata = currentNetworkData;
	  
	  if (edata == null) {
	  	alert("Empty");
	  	hideLoader();
	  	return;
	  }

		edata.forEach(function(element){
			
				if (  (element[0] != "-" && element[0] != null && element[0] != "null")
							&& (element[1] != "-" && element[1] != null && element[1] != "null")
							&& (element[0] != element[1])  )
    		g.addEdge(element[0], element[1]);
    	
		});		
		
		var layouter = new Dracula.Layout.Spring(g);
		layouter.layout();
		
		var renderer = new Dracula.Renderer.Raphael('#usernetwork', g, $('#usernetwork').width(), 1024);
		renderer.draw();
		
		hideLoader();
}

function allNetworkList() 
{
		showLoader();
	  var g = new Dracula.Graph();
	  
	  var edata = currentNetworkData;
	  
	  if (edata == null) {
	  	alert("Empty");
	  	hideLoader();
	  	return;
	  }

		edata.forEach(function(element){
			if (element[1] == "-" || element[1] == null || element[1] == "null") {
				g.addEdge(element[0], element[0]);
			}
			else {
    		g.addEdge(element[0], element[1]);
    	}
		});		
		
		var layouter = new Dracula.Layout.Spring(g);
		layouter.layout();
		
		var renderer = new Dracula.Renderer.Raphael('#usernetwork', g, $('#usernetwork').width(), 1024);
		renderer.draw();
		
		hideLoader();
}

function initAdmin() {
	getUserNetwork();  
}



initAdmin();
