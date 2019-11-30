
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

    var size = 180;

    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

      // called once before every frame where the icon will be used
      render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = size / 2 * 0.3;
        var outerRadius = size / 2 * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      }
    };

    map.on('load', function () {

          map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

          var nodeList = [];
          var ii = 0;
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

                      var point = {
                            "type": "FeatureCollection",
                            "features": [{
                              "type": "Feature",
                              "properties": {},
                              "geometry": {
                                  "type": "Point",
                                  "coordinates": origin
                                }
                              }]
                      };

                      var point2 = {
                            "type": "FeatureCollection",
                            "features": [{
                              "type": "Feature",
                              "properties": {},
                              "geometry": {
                                  "type": "Point",
                                  "coordinates": destination
                                }
                              }]
                      };

                      map.addSource('point' + ii, {
                        "type": "geojson",
                        "data": point
                      });

                      map.addLayer({
                        "id": 'point' + ii,
                        "source": 'point' + ii,
                        "type": "symbol",
                        "layout": {
                          "icon-image": "pulsing-dot"
                        }
                      });

                      map.addSource('point_' + ii, {
                        "type": "geojson",
                        "data": point2
                      });

                      map.addLayer({
                        "id": 'point_' + ii,
                        "source": 'point_' + ii,
                        "type": "symbol",
                        "layout": {
                          "icon-image": "pulsing-dot"
                        }
                      });

                      map.addSource('route' + ii, {
                          "type": "geojson",
                          "data": route
                      });

                      map.addLayer({
                          "id": 'route' + ii,
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

function initAdmin() {
  getUserNetwork();
}



initAdmin();
