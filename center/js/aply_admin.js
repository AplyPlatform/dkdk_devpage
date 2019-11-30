

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
	  var cy = cytoscape({

  		container: document.getElementById('usernetwork'), // container to render in

		  elements: edate,
		
		  style: [ // the stylesheet for the graph
		    {
		      selector: 'node',
		      style: {
		        'background-color': '#666',
		        'label': 'data(id)'
		      }
		    },
		
		    {
		      selector: 'edge',
		      style: {
		        'width': 3,
		        'line-color': '#ccc',
		        'target-arrow-color': '#ccc',
		        'target-arrow-shape': 'triangle'
		      }
		    }
		  ],
		
		  layout: {
		    name: 'grid',
		    rows: 1
		  }
		});
}

function initAdmin() {
	getUserNetwork();  
}



initAdmin();
