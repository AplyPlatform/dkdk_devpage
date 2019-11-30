
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

    var dimensionX = 120;
    var dimensionY = 60;

    var renderEvent = function(r, n) {
      var set = r.set().push(
        r.rect(n.point[0], n.point[1], dimensionX, dimensionY).click(function () {
          console.log(this.data("i"));}).attr({
          "fill": '#D6D825',
          "stroke-width": 2,
          r: "9px"
        })).push(r.text(n.point[0]+(dimensionX/2), n.point[1]+(dimensionY/2), n.label).attr({
          "font-size": "12px"
        }));
        set.click(
          function onClick() {
            console.log('click');
          }
        );
        return set;
  };

		edata.forEach(function(element){
				if (  (element[0] != "-" && element[0] != null && element[0] != "null")
							&& (element[1] != "-" && element[1] != null && element[1] != "null")
							&& (element[0] != element[1])  )
              {
                g.addNode(element[0], {label: element[0], render: renderPerson});
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

function setMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VubWFuOTciLCJhIjoiY2lvOWFpdDc5MDMxdnZpbHpocjRmMzI2ZyJ9.lnenicwIbPNDr2k7gbKLbA';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });

    // San Francisco
var origin = [-122.414, 37.776];

// Washington DC
var destination = [-77.032, 38.913];

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

// A single point that animates along the route.
// Coordinates are initially set to origin.
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

  map.on('load', function () {
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
  });
}

function initAdmin() {
  setMapbox();
	getUserNetwork();
}



initAdmin();
