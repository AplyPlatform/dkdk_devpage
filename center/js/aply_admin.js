

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

function addNetworkList(item) {
    var nodes = new vis.DataSet(item.nodes);
	
	  // create an array with edges
	  var edges = new vis.DataSet(item.edges);
	
	  // create a network
	  var container = document.getElementById("usernetwork");
	  var data = {
	    nodes: nodes,
	    edges: edges
	  };
	  var options = {};
	  var network = new vis.Network(container, data, options);
}

function initAdmin() {
	getUserNetwork();  
}



initAdmin();
