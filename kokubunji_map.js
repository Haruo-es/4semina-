var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = []; 

// 曜日の配列
var week={
  "0":"日",
  "1":"月",
  "2":"火",
  "3":"水",
  "4":"木",
  "5":"金",
  "6":"土"
};

//曜日取得
function fGetWeek(){
  var d=new Date();
  return d.getDay();
}

function createData(results) {
    for (let i=0; i<results.length; i++) {
	x = results[i].geometry.location;
	y = results[i].name;
	z = results[i].price_level;
	
	r = results[i].distance;
	s = results[i].url;
	t = results[i].website;
	u = results[i].hours;
	x["name"] = y;
	x["price"] = z;
	
	x["distance"] = r;
	x["url"] = s;
	x["website"] = t;
	x["opening_hours"] = u;

    switch(results[i].shop) {
      case "cafe":
	x["icon_path"] = './img/icon1.png'
	place_cafe.push(x);
        break;
      case "famires":
	x["icon_path"] = './img/icon2.png'
	place_famires.push(x);
        break;
      case "hamburger":
	x["icon_path"] = './img/icon3.png'
	place_hamburger.push(x);
        break;
      case "karaoke":
	x["icon_path"] = './img/icon4.png'
	place_karaoke.push(x);
        break;
      case "netcafe":
	x["icon_path"] = './img/icon5.png'
	place_netcafe.push(x);
        break;
    }
  } 
  /*
  place:
  {
    i:
      lat: xxx
      lng: yyy
      name: "zzz"
      price: 0
      url: "https://..."
  }
  */
}

function openingHours(weeknum, place, i){
    var str = '不明';
    if(weeknum == 0){ weeknum = 7; }
    if(place[i].opening_hours.weekday_text){
	s1 = place[i].opening_hours.weekday_text[weeknum-1];
	str = s1.slice(4);
    }
    return(str)
}

function createMarker(i, place, marker) {
    var marker = new google.maps.Marker({
    position: { lat:place[i].lat, lng:place[i].lng },
    map: map,
    title: place[i].name,
    icon: {
	url: place[i].icon_path ,
	scaledSize: new google.maps.Size( 27, 40 ) ,
  }

  });
	var openingHour = openingHours(fGetWeek(), place, i)
    
    	var contentStr = '<a>' + place[i].name + '<br>●Wi-Fi<br>●国分寺駅から' + place[i].distance + 'm<br>●' + week[fGetWeek()] + '曜日の営業時間：'+ openingHour + '</a>' + '<br><a href=';
	
    if(place[i].website){
	contentStr = contentStr + place[i].website + '>ホームページ</a> / '
    }
    contentStr = contentStr + '<a href=' + place[i].url + '>Google検索</a>'
    

  var infoWindow = new google.maps.InfoWindow({
    content: contentStr,
  });

  google.maps.event.addListener(marker, 'click', function(){
    if(currentInfoWindow != null) {
      currentInfoWindow.close();
    }
    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
  });
}

function cafe() {
  for (var i=0; i<place_cafe.length; i++) {
      markers_cafe.push(createMarker(i, place_cafe));
  }
}

function famires() {
  for (var i=0; i<place_famires.length; i++) {
      markers_famires.push(createMarker(i, place_famires));
  }
}

function hamburger() {
  for (var i=0; i<place_hamburger.length; i++) {
      markers_hamburger.push(createMarker(i, place_hamburger));
  }
}

function karaoke() {
  for (var i=0; i<place_karaoke.length; i++) {
      markers_karaoke.push(createMarker(i, place_karaoke));
  }
}

function netcafe() {
  for (var i=0; i<place_netcafe.length; i++) {
      markers_netcafe.push(createMarker(i, place_netcafe));
  }
}

function setcafe(map){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setVisible(true);
  }
}

function setfamires(){
  for(var i=0; i<markers_famires.length; i++){
    markers_famires[i].setVisible(true);
  }
}

function sethamburger(){
  for(var i=0; i<markers_hamburger.length; i++){
    markers_hamburger[i].setVisible(true);
  }
}

function setkaraoke(){
  for(var i=0; i<markers_karaoke.length; i++){
    markers_karaoke[i].setVisible(true);
  }
}

function setnetcafe(){
  for(var i=0; i<markers_netcafe.length; i++){
    markers_netcafe[i].setVisible(true);
  }
}

function hideMarkersAll(){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setVisible(false);
  }
  for(var j=0; j<markers_famires.length; j++){
    markers_famires[j].setVisible(false);
  }
  for(var k=0; k<markers_hamburger.length; k++){
    markers_hamburger[k].setVisible(false);
  }
  for(var l=0; l<markers_karaoke.length; l++){
    markers_karaoke[l].setVisible(false);
  }
  for(var m=0; m<markers_netcafe.length; m++){
    markers_netcafe[m].setVisible(false);
  }
}

function initMap() {
  console.log("xx3");
  var target = document.getElementById('map');  
  var latlng = {lat: 35.7002283, lng: 139.4805254};  //国分寺駅の緯度経度
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 16
  });
  createData(kokubunji_data.results);
  cafe();
  famires();
  hamburger();
  karaoke();
  netcafe();
  console.log("xx4");
}
