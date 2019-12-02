
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
	  	alert("Data is preparing, Please, try again.");
	  	hideLoader();
	  	getUserNetwork();
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
	  	alert("Data is preparing, Please, try again.");
	  	hideLoader();
	  	getUserNetwork();
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
    var min = -0.2,
        max = 0.2,
        highlightedNumber = Math.random() * (max - min) + min;

    return highlightedNumber;
};

var map = null;

function onlyConnectedNetworkOnMap()
{
		showLoader();

        // San Francisco
    var origin = [126.8891235, 37.5654168];
    // Washington DC
    var destination = [126.8491235, 37.5650168];

    mapboxgl.accessToken = getCookie('map_key');

    if (map == null) {
	    map = new mapboxgl.Map({
	      container: 'map',
	      style: 'mapbox://styles/mapbox/streets-v11'
	    });
	  }


	  var edata = currentNetworkData;

	  if (edata == null) {
	  	hideLoader();
	  	return;
	  }

    map.on('load', function () {
          //
          // map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

          var nodeList = [];
          var ii = 0;
      		edata.forEach(function(element){
      				if (  (element[0] != "-" && element[0] != null && element[0] != "null")
      							&& (element[1] != "-" && element[1] != null && element[1] != "null")
      							&& (element[0] != element[1])  )
                    {
                            var bFound = false;
                            var featuresArray = [];

                            origin[0] += generateRandomNumber();
                            origin[1] += generateRandomNumber();
                            destination[0] += generateRandomNumber();
                            destination[1] += generateRandomNumber();

                            for(var i=0;i<nodeList.length;i++) {
                              var dn = nodeList[i];
                              if (dn == element[0]) {
                                bFound = true;
                                break;
                              }
                            }

                            if (bFound == false) {
                              nodeList.push(element[0]);
                              featuresArray.push({
                                "type": "Feature",
                                "properties": {
                                      "description": element[0],
                                      "icon": "theatre"
                                    },
                                    "geometry": {
                                    "type": "Point",
                                    "coordinates": origin
                                    }
                              });
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
                              featuresArray.push({
                                "type": "Feature",
                                "properties": {
                                      "description": element[1],
                                      "icon": "theatre"
                                    },
                                    "geometry": {
                                    "type": "Point",
                                    "coordinates": destination
                                    }
                              });
                            }


                            var points =
                                {
                                  "type": "FeatureCollection",
                                  "features": featuresArray
                            };

                            map.addSource('point' + ii, {
                              "type": "geojson",
                              "data": points
                            });

                            map.addLayer({
                                  "id": 'point_' + ii,
                                  "type": "symbol",
                                  "source": 'point' + ii,
                                  "layout": {
                                    "text-field": ["get", "description"],
                                    "text-variable-anchor": ["top", "bottom", "left", "right"],
                                    "text-radial-offset": 0.5,
                                    "text-justify": "auto",
                                    "icon-image": ["concat", ["get", "icon"], "-15"]
                                  }
                            });

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

														map.addSource('route' + ii, {
                                "type": "geojson",
                                "data": route
                            });

                            map.addLayer({
                                "id": 'route_' + ii,
                                "source": 'route' + ii,
                                "type": "line",
                                "paint": {
                                  "line-width": 2,
                                  "line-color": "#007cbf"
                                }
                            });



                      ii++;
                    }
      		});

    });

		hideLoader();
}


var nodeNodeList = [];
var mapNodeList = [];
var tempLat, tempLng;
var cNodeCount = 0;

function isNodeOnMap(user_uuid) {
	var len = mapNodeList.length;
	for(var i=0;i<len;i++) {
		if (mapNodeList[i] == user_uuid)
        return true;
	}

	return false;
}

function addNodeToMap(data) {

	if (isNodeOnMap(data.user_uuid) == true) return;

	mapNodeList.push(data.user_uuid);
	if (isSet(data.lat) == false || isSet(data.lng) == false) return;

	var el = document.createElement('div');
  var textel;
  var ap;

	if (isSet(data.imageData) == false) {
  		ap = document.createElement('div');
    	ap.className = 'marker';
  		ap.title = data.user_nickname;
  		textel = document.createTextNode(data.user_nickname);
	}
  else {
    	var srcImg = "data:image/jpeg;base64,";
  		srcImg += data.imageData;
  		ap = document.createElement('img');
  		ap.className = 'markerImage';
  		ap.src = srcImg;
  		ap.setAttribute('alt', data.user_nickname);
  		textel = document.createTextNode(data.user_nickname);
	}

  var container = document.createElement("span");
  container.style.color = "red";
	container.appendChild(textel);
	el.appendChild(container);
	el.appendChild(ap);
	el.width = el.height = "60";
	el.setAttribute("id", "div_" + data.user_uuid);
	el.onclick = function () {
		elClickHandler(data.user_uuid);
	};

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat([data.lng, data.lat])
    .addTo(map);
}

function drawLineToFriend(user_uuid, oLat, oLng, friends) {
  if (friends == null) return null;

  var len = friends.length;
  var routes = [];

  for(var i=0;i<len;i++) {
    if (friends[i].user_uuid == user_uuid) continue;

    var nData = friends[i];
    var tLat, tLng;
    if (isSet(nData.lat) && isSet(nData.lng)) {
      tLat = nData.lat;
      tLng = nData.lng;
    }
    else {
      tLat = oLat + generateRandomNumber();
      tLng = oLng + generateRandomNumber();

      nData['lat'] = tLat;
      nData['lng'] = tLng;
    }

    addNodeToMap(nData);

    var rt = {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [[oLng, oLat], [tLng, tLat]]
            }
    };
    routes.push(rt);
  }

  return routes;
}

function getNode(user_uuid) {
  var len = nodeNodeList.length;
  for(var i=0;i<len;i++) {
    if (nodeNodeList[i].user_uuid == user_uuid) {
      return nodeNodeList[i];
    }
  }

  return null;
}

function elClickHandler(user_uuid) {
      var node = getNode(user_uuid);
			if (node == null) {
        realRequestNode(node.user_nickname, elClickHandler);
        return;
      }

      var routes = drawLineToFriend(node.user_uuid, node.lat, node.lng, node.friends);
			if (routes == null || routes.length <= 0) return;

			var route = {
              "type": "FeatureCollection",
              "features": routes
      };

			map.addSource('route' + cNodeCount, {
          "type": "geojson",
          "data": route
      });

      map.addLayer({
          "id": 'route_' + cNodeCount,
          "source": 'route' + cNodeCount,
          "type": "line",
          "paint": {
            "line-width": 2,
            "line-color": "#007cbf"
          }
      });

      cNodeCount++;
}

function addNode(data, callback) {
  if (getNode(data.user_uuid) == null)
    nodeNodeList.push(data);

  addNodeToMap(data);

  if (callback == null) return;

  callback(data.user_uuid);
}

function requestNode() {
  showLoader();

  var node_nickname = $('#node_nickname').val();

  realRequestNode(node_nickname, null);
}

function realRequestNode(node_nickname, callback) {
  if (node_nickname == "") {
	   alert("사용자의 닉네임이 잘 못 되었습니다");
     hideLoader();
	   return;
  }

  var token = getCookie("user_token");
  var emailid = getCookie("dev_user_id");

  var jdata = {"daction": "admin_get_node",
    "node_nickname" : node_nickname,
    "emailid" : emailid,
    "token" : token,
    "action" : "developer"
  };

  ajaxRequest(jdata, function (r) {
    if(r.result == "success") {
      $('#node_nickname').val("");
      addNode(r.data, callback);
      hideLoader();
    }else {
      hideLoader();
      alert("Node 정보 얻기에 실패하였습니다. " + r.reason);
    }
  }, function(request, status, error) {
    hideLoader();
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  });
}

function initAdmin() {
  onlyConnectedNetworkOnMap();
}



initAdmin();
