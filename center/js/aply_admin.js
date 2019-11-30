
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
          onlyConnectedNetworkOnMap();
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
              {
            		g.addEdge(element[0], element[1]);
              }
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

function generateRandomNumber() {
    var min = 0.0001,
        max = 0.09,
        highlightedNumber = Math.random() * (max - min) + min;

    return highlightedNumber;
};

function onlyConnectedNetworkOnMap()
{
		showLoader();

        // San Francisco
    var origin = [-122.414, 37.776];
    // Washington DC
    var destination = [37.5650168, 126.8491235];

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VubWFuOTciLCJhIjoiY2lvOWFpdDc5MDMxdnZpbHpocjRmMzI2ZyJ9.lnenicwIbPNDr2k7gbKLbA';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });

	  var edata = currentNetworkData;

	  if (edata == null) {
	  	alert("Empty");
	  	hideLoader();
	  	return;
	  }

    map.on('load', function () {

          var nodeList = [];
      		edata.forEach(function(element){
      				if (  (element[0] != "-" && element[0] != null && element[0] != "null")
      							&& (element[1] != "-" && element[1] != null && element[1] != "null")
      							&& (element[0] != element[1])  )
                    {
                      var bFound = false;
                      for(var i=0;i<nodeList.length;i++) {
                        var dn = nodeList[i];
                        if (dn == element[0]) {
                          bFound = true;
                          break;
                        }
                      }

                      if (bFound == false) {

                        nodeList.push(element[0]);
                      }

                      bFound = false;
                      for(var i=0;i<nodeList.length;i++) {
                        var dn = nodeList[i];
                        if (dn == element[1]) {
                          bFound = true;
                          break;
                        }
                      }

                      if (bFound == false) {
                        nodeList.push(element[1]);
                      }

                      origin[0] += generateRandomNumber();
                      origin[1] += generateRandomNumber();
                      destination[0] += generateRandomNumber();
                      destination[1] += generateRandomNumber();
                      // A simple line from origin to destination.
                      var route = {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "LineString",
                                    "coordinates": [
                                      origin,
                                      destination
                                    ]
                                  }
                            }]
                      };

                      map.addSource('route', {
                          "type": "geojson",
                          "data": route
                      });

                      map.addLayer({
                          "id": "route",
                          "source": "route",
                          "type": "line",
                          "paint": {
                            "line-width": 2,
                            "line-color": "#007cbf"
                          }
                      });
                    }
      		});

    });

		hideLoader();
}

function initAdmin() {
  getUserNetwork();
}



initAdmin();
