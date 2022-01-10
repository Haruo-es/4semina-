var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = [];

function initMap() {
  var latlng = new google.maps.LatLng(35.69092, 139.7002579);
  var opts = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
  
  createData(shinjuku_data.results);
  
  createmarker();
}

function createData(results) {
  for (let i=0; i<results.length; i++) {
    x = results[i].geometry.location;
    y = results[i].name;
    z = results[i].price_level;
    s = results[i].url
    x["name"] = y;
    x["price"] = z;
    x["url"] = s;

    switch(results[i].shop) {
      case "cafe":
        place_cafe.push(x);
        break;
      case "famires":
        place_famires.push(x);
        break;
      case "hamburger":
        place_hamburger.push(x);
        break;
      case "karaoke":
        place_karaoke.push(x);
        break;
      case "netcafe":
        place_netcafe.push(x);
        break;
    }
  } 
}

function createmarker(){
  var cafe_latlng = [];
  for(var i=0; i<place_cafe.length; i++){
    cafe_latlng[i] = new google.maps.LatLng(place_cafe[i].lat,place_cafe[i].lng);
    markers_cafe[i] = new google.maps.Marker({
      position: cafe_latlng[i],
      title: place_cafe[i].name,
      icon: {
	      url: place_cafe[i].icon_path ,
	      scaledSize: new google.maps.Size( 27, 40 ) ,
      }
    });
    //var date = new Date();
    //var dayOfWeek = date.getDay();
    
    //var contentStr = '<a>' + place_cafe[i].name + '<br>●Wi-Fi<br>●新宿駅から' + place_cafe[i].distance + 'm<br>●本日の営業時間：(後で変更予定)' + '</a>' + '<br><a href=';

    //if(place_cafe[i].website){
	    //contentStr = contentStr + place_cafe[i].website + '>ホームページ</a> / '
    //}
    //contentStr = contentStr + '<a href=' + place_cafe[i].url + '>Google検索</a>'
    

    //var infoWindow_cafe = new google.maps.InfoWindow({
      //content: contentStr,
    //});
  }
  var famires_latlng = [];
  for(var j=0; j<place_famires.length; j++){
    famires_latlng[j] = new google.maps.LatLng(place_famires[j].lat,place_famires[j].lng);
    markers_famires[j] = new google.maps.Marker({
      position: famires_latlng[j],
    });
  }
  var hamburger_latlng = [];
  for(var k=0; k<place_hamburger.length; k++){
    hamburger_latlng[k] = new google.maps.LatLng(place_hamburger[k].lat,place_hamburger[k].lng);
    markers_hamburger[k] = new google.maps.Marker({
      position: hamburger_latlng[k],
    });
  }
  var karaoke_latlng = [];
  for(var m=0; m<place_karaoke.length; m++){
    karaoke_latlng[m] = new google.maps.LatLng(place_karaoke[m].lat,place_karaoke[m].lng);
    markers_karaoke[m] = new google.maps.Marker({
      position: karaoke_latlng[m],
    });
  }
  var netcafe_latlng = [];
  for(var n=0; n<place_netcafe.length; n++){
    netcafe_latlng[n] = new google.maps.LatLng(place_netcafe[n].lat,place_netcafe[n].lng);
    markers_netcafe[n] = new google.maps.Marker({
      position: netcafe_latlng[n],
    });
  }
}

function cafe(){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setMap(map);
  }
}

function famires(){
  for(var i=0; i<markers_famires.length; i++){
    markers_famires[i].setMap(map);
  }
}

function hamburger(){
  for(var i=0; i<markers_hamburger.length; i++){
    markers_hamburger[i].setMap(map);
  }
}

function karaoke(){
  for(var i=0; i<markers_karaoke.length; i++){
    markers_karaoke[i].setMap(map);
  }
}

function netcafe(){
  for(var i=0; i<markers_netcafe.length; i++){
    markers_netcafe[i].setMap(map);
  }
}

function deletemarkersall(){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setMap(null);
  }
  for(var j=0; j<markers_famires.length; j++){
    markers_famires[j].setMap(null);
  }
  for(var k=0; k<markers_hamburger.length; k++){
    markers_hamburger[k].setMap(null);
  }
  for(var l=0; l<markers_karaoke.length; l++){
    markers_karaoke[l].setMap(null);
  }
  for(var m=0; m<markers_netcafe.length; m++){
    markers_netcafe[m].setMap(null);
  }
}

//function doOpen() {
  //for(var i=0; i<markers_cafe.length; i++){
    //markers_cafe[i].setMap(map);
  //}
//}

//function doClose() {
  //for(var i=0; i<markers_cafe.length; i++){
    //markers_cafe[i].setMap(null);
  //}
//}
