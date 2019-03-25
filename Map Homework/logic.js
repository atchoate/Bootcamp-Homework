var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";

d3.json(url, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<p><b>" + feature.properties.place + "</b></p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }

    var earthquakes = L.geoJSON(earthquakeData, {
       onEachFeature: onEachFeature,
       pointToLayer: function (feature, latlng) {
           var color;
           var r = 300;
           var g = Math.floor(300-75*feature.properties.mag);
           var b = Math.floor(300-75*feature.properties.mag);
           color = "rgb("+r+", "+g+", "+b+")"

           var Markers = {
               radius: 4*feature.properties.mag,
               fillColor: color,
               color: "black",
               weight: 1,
               opacity: 1,
               fillOpacity: 0.7
           };

           return L.circleMarker(latlng, Markers);
       }
    });


    createMap(earthquakes);
}

function createMap(earthquakes) {
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
    
    var baseMaps = {
        "Street Map": streetmap
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [
            12.9823432, -175.5922106
        ],
        zoom: 3,
        layers: [streetmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    function getColor(c) {
        return c < 1 ? 'rgb(255,255,255)' :
        c < 2 ? 'rgb(255,255,255)' :
        c < 3 ? 'rgb(255,195,195)' :
        c < 4 ? 'rgb(255,165,165)' :
        c < 5 ? 'rgb(255,135,135)' :
        c < 6 ? 'rgb(255,110,110)' :
        c < 7 ? 'rgb(255,70,70)' :
        c < 8 ? 'rgb(255,45,45)' :
        c < 9 ? 'rgb(255,15,15)' :
        'rgb(255,0,0)';
    }

    var legend = L.control({position: 'topleft'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        labels = [];

        div.innerHTML += 'Magnitude<br><hr>'

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
}

