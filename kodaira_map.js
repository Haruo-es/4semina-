var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = []; 

var markers_cafe_nomal_near = [], markers_cafe_nomal_nomal = [], markers_cafe_nomal_far = [];
var markers_cafe_ex_near = [], markers_cafe_ex_nomal = [], markers_cafe_ex_far = [];
var markers_cafe_others_near = [], markers_cafe_others_nomal = [], markers_cafe_others_far = [];

var markers_famires_nomal_near = [], markers_famires_nomal_nomal = [], markers_famires_nomal_far = [];
var markers_famires_ex_near = [], markers_famires_ex_nomal = [], markers_famires_ex_far = [];
var markers_famires_others_near = [], markers_famires_others_nomal = [], markers_famires_others_far = [];

var markers_hamburger_nomal_near = [], markers_hamburger_nomal_nomal = [], markers_hamburger_nomal_far = [];
var markers_hamburger_ex_near = [], markers_hamburger_ex_nomal = [], markers_hamburger_ex_far = [];
var markers_hamburger_others_near = [], markers_hamburger_others_nomal = [], markers_hamburger_others_far = [];

var markers_karaoke_nomal_near = [], markers_karaoke_nomal_nomal = [], markers_karaoke_nomal_far = [];
var markers_karaoke_ex_near = [], markers_karaoke_ex_nomal = [], markers_karaoke_ex_far = [];
var markers_karaoke_others_near = [], markers_karaoke_others_nomal = [], markers_karaoke_others_far = [];

var markers_netcafe_nomal_near = [], markers_netcafe_nomal_nomal = [], markers_netcafe_nomal_far = [];
var markers_netcafe_ex_near = [], markers_netcafe_ex_nomal = [], markers_netcafe_ex_far = [];
var markers_netcafe_others_near = [], markers_netcafe_others_nomal = [], markers_netcafe_others_far = [];



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

function createMarker(i, place) {
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
	return(marker);
}


//マーカー作成
function cafe() {
  for (var i=0; i<place_cafe.length; i++) {
	  if(place_cafe.price_level = 3){
		  if(place_cafe.distance <= 500){
			  markers_cafe_nomal_near.push(createMarker(i, place_cafe));
		  }else if(place_cafe.distance <= 1000){
			  markers_cafe_nomal_nomal.push(createMarker(i, place_cafe));
		  }else{
		  	  markers_cafe_nomal_far.push(createMarker(i, place_cafe));
		  }
	  }else if(place_cafe.price_level = 4){
	  	if(place_cafe.distance <= 500){
			markers_cafe_ex_near.push(createMarker(i, place_cafe));
		}else if(place_cafe.distance <= 1000){
			markers_cafe_ex_nomal.push(createMarker(i, place_cafe));
		}else{
		  	markers_cafe_ex_far.push(createMarker(i, place_cafe));
		}
	  }else{
	  	if(place_cafe.distance <= 500){
			markers_cafe_far_near.push(createMarker(i, place_cafe));
		}else if(place_cafe.distance <= 1000){
			markers_cafe_far_nomal.push(createMarker(i, place_cafe));
		}else{
		  	markers_cafe_far_far.push(createMarker(i, place_cafe));
		}
	  }
  }
  for (var j=0; j<place_cafe.length; j++) {
	  markers_cafe.push(createMarker(j, place_cafe));
  }
}

function famires() {
  for (var i=0; i<place_famires.length; i++) {
	  if(place_famires.price_level = 3){
		  if(place_famires.distance <= 500){
			  markers_famires_nomal_near.push(createMarker(i, place_famires));
		  }else if(place_famires.distance <= 1000){
			  markers_famires_nomal_nomal.push(createMarker(i, place_famires));
		  }else{
		  	  markers_famires_nomal_far.push(createMarker(i, place_famires));
		  }
	  }else if(place_famires.price_level = 4){
	  	if(place_famires.distance <= 500){
			markers_famires_ex_near.push(createMarker(i, place_famires));
		}else if(place_famires.distance <= 1000){
			markers_famires_ex_nomal.push(createMarker(i, place_famires));
		}else{
		  	markers_famires_ex_far.push(createMarker(i, place_famires));
		}
	  }else{
	  	if(place_famires.distance <= 500){
			markers_famires_far_near.push(createMarker(i, place_famires));
		}else if(place_famires.distance <= 1000){
			markers_famires_far_nomal.push(createMarker(i, place_famires));
		}else{
		  	markers_famires_far_far.push(createMarker(i, place_famires));
		}
	  }
  }
  for (var i=0; i<place_famires.length; i++) {
      markers_famires.push(createMarker(i, place_famires));
  }
}

function hamburger() {
  for (var i=0; i<place_hamburger.length; i++) {
	  if(place_hamburger.price_level = 3){
		  if(place_hamburger.distance <= 500){
			  markers_hamburger_nomal_near.push(createMarker(i, place_hamburger));
		  }else if(place_hamburger.distance <= 1000){
			  markers_hamburger_nomal_nomal.push(createMarker(i, place_hamburger));
		  }else{
		  	  markers_hamburger_nomal_far.push(createMarker(i, place_hamburger));
		  }
	  }else if(place_hamburger.price_level = 4){
	  	if(place_hamburger.distance <= 500){
			markers_hamburger_ex_near.push(createMarker(i, place_hamburger));
		}else if(place_hamburger.distance <= 1000){
			markers_hamburger_ex_nomal.push(createMarker(i, place_hamburger));
		}else{
		  	markers_hamburger_ex_far.push(createMarker(i, place_hamburger));
		}
	  }else{
	  	if(place_hamburger.distance <= 500){
			markers_hamburger_far_near.push(createMarker(i, place_hamburger));
		}else if(place_hamburger.distance <= 1000){
			markers_hamburger_far_nomal.push(createMarker(i, place_hamburger));
		}else{
		  	markers_hamburger_far_far.push(createMarker(i, place_hamburger));
		}
	  }
  }
  for (var i=0; i<place_hamburger.length; i++) {
      markers_hamburger.push(createMarker(i, place_hamburger));
  }
}

function karaoke() {
  for (var i=0; i<place_karaoke.length; i++) {
	  if(place_karaoke.price_level = 3){
		  if(place_karaoke.distance <= 500){
			  markers_karaoke_nomal_near.push(createMarker(i, place_karaoke));
		  }else if(place_karaoke.distance <= 1000){
			  markers_karaoke_nomal_nomal.push(createMarker(i, place_karaoke));
		  }else{
		  	  markers_karaoke_nomal_far.push(createMarker(i, place_karaoke));
		  }
	  }else if(place_karaoke.price_level = 4){
	  	if(place_karaoke.distance <= 500){
			markers_karaoke_ex_near.push(createMarker(i, place_karaoke));
		}else if(place_karaoke.distance <= 1000){
			markers_karaoke_ex_nomal.push(createMarker(i, place_karaoke));
		}else{
		  	markers_karaoke_ex_far.push(createMarker(i, place_karaoke));
		}
	  }else{
	  	if(place_karaoke.distance <= 500){
			markers_karaoke_far_near.push(createMarker(i, place_karaoke));
		}else if(place_karaoke.distance <= 1000){
			markers_karaoke_far_nomal.push(createMarker(i, place_karaoke));
		}else{
		  	markers_karaoke_far_far.push(createMarker(i, place_karaoke));
		}
	  }
  }
  for (var i=0; i<place_karaoke.length; i++) {
      markers_karaoke.push(createMarker(i, place_karaoke));
  }
}

function netcafe() {
  for (var i=0; i<place_netcafe.length; i++) {
	  if(place_netcafe.price_level = 3){
		  if(place_netcafe.distance <= 500){
			  markers_netcafe_nomal_near.push(createMarker(i, place_netcafe));
		  }else if(place_netcafe.distance <= 1000){
			  markers_netcafe_nomal_nomal.push(createMarker(i, place_netcafe));
		  }else{
		  	  markers_netcafe_nomal_far.push(createMarker(i, place_netcafe));
		  }
	  }else if(place_netcafe.price_level = 4){
	  	if(place_netcafe.distance <= 500){
			markers_netcafe_ex_near.push(createMarker(i, place_netcafe));
		}else if(place_cafe.distance <= 1000){
			markers_netcafe_ex_nomal.push(createMarker(i, place_netcafe));
		}else{
		  	markers_netcafe_ex_far.push(createMarker(i, place_netcafe));
		}
	  }else{
	  	if(place_netcafe.distance <= 500){
			markers_netcafe_far_near.push(createMarker(i, place_netcafe));
		}else if(place_netcafe.distance <= 1000){
			markers_netcafe_far_nomal.push(createMarker(i, place_netcafe));
		}else{
		  	markers_netcafe_far_far.push(createMarker(i, place_netcafe));
		}
	  }
  }
  for (var i=0; i<place_netcafe.length; i++) {
      markers_netcafe.push(createMarker(i, place_netcafe));
  }
}


//表示
function setcafe(){
  for(var i=0; i<markers_cafe.length; i++){
    markers_cafe[i].setVisible(true);
  }
}

function setcafe1(){
  for(var i=0; i<markers_cafe_nomal_near.length; i++){
    markers_cafe_nomal_near[i].setVisible(true);
  }
}

function setcafe2(){
  for(var i=0; i<markers_cafe_nomal_nomal.length; i++){
    markers_cafe_nomal_nomal[i].setVisible(true);
  }
}

function setcafe3(){
  for(var i=0; i<markers_cafe_nomal_far.length; i++){
    markers_cafe_nomal_far[i].setVisible(true);
  }
}

function setcafe4(){
  for(var i=0; i<markers_cafe_ex_near.length; i++){
    markers_cafe_ex_near[i].setVisible(true);
  }
}
function setcafe5(){
  for(var i=0; i<markers_cafe_ex_nomal.length; i++){
    markers_cafe_ex_nomal[i].setVisible(true);
  }
}

function setcafe6(){
  for(var i=0; i<markers_cafe_ex_far.length; i++){
    markers_cafe_ex_far[i].setVisible(true);
  }
}

function setcafe7(){
  for(var i=0; i<markers_cafe_others_near.length; i++){
    markers_cafe_others_near[i].setVisible(true);
  }
}

function setcafe8(){
  for(var i=0; i<markers_cafe_others_nomal.length; i++){
    markers_cafe_others_noaml[i].setVisible(true);
  }
}

function setcafe9(){
  for(var i=0; i<markers_cafe_others_far.length; i++){
    markers_cafe_others_far[i].setVisible(true);
  }
}

function setfamires(){
  for(var i=0; i<markers_famires.length; i++){
    markers_famires[i].setVisible(true);
  }
}

function setfamires1(){
  for(var i=0; i<markers_famires_nomal_near.length; i++){
    markers_famires_nomal_near[i].setVisible(true);
  }
}

function setfamires2(){
  for(var i=0; i<markers_famires_nomal_nomal.length; i++){
    markers_famires_nomal_nomal[i].setVisible(true);
  }
}

function setfamires3(){
  for(var i=0; i<markers_famires_nomal_far.length; i++){
    markers_famires_nomal_far[i].setVisible(true);
  }
}

function setfamires4(){
  for(var i=0; i<markers_famires_ex_near.length; i++){
    markers_famires_ex_near[i].setVisible(true);
  }
}
function setfamires5(){
  for(var i=0; i<markers_famires_ex_nomal.length; i++){
    markers_famires_ex_nomal[i].setVisible(true);
  }
}

function setfamires6(){
  for(var i=0; i<markers_famires_ex_far.length; i++){
    markers_famires_ex_far[i].setVisible(true);
  }
}

function setfamires7(){
  for(var i=0; i<markers_famires_others_near.length; i++){
    markers_famires_others_near[i].setVisible(true);
  }
}

function setfamires8(){
  for(var i=0; i<markers_famires_others_nomal.length; i++){
    markers_famires_others_noaml[i].setVisible(true);
  }
}

function setfamires9(){
  for(var i=0; i<markers_famires_others_far.length; i++){
    markers_famires_others_far[i].setVisible(true);
  }
}

function sethamburger(){
  for(var i=0; i<markers_hamburger.length; i++){
    markers_hamburger[i].setVisible(true);
  }
}

function sethamburger1(){
  for(var i=0; i<markers_hamburger_nomal_near.length; i++){
    markers_hamburger_nomal_near[i].setVisible(true);
  }
}

function sethamburger2(){
  for(var i=0; i<markers_hamburger_nomal_nomal.length; i++){
    markers_hamburger_nomal_nomal[i].setVisible(true);
  }
}

function sethamburger3(){
  for(var i=0; i<markers_hamburger_nomal_far.length; i++){
    markers_hamburger_nomal_far[i].setVisible(true);
  }
}

function sethamburger4(){
  for(var i=0; i<markers_hamburger_ex_near.length; i++){
    markers_hamburger_ex_near[i].setVisible(true);
  }
}
function sethamburger5(){
  for(var i=0; i<markers_hamburger_ex_nomal.length; i++){
    markers_hamburger_ex_nomal[i].setVisible(true);
  }
}

function sethamburger6(){
  for(var i=0; i<markers_hamburger_ex_far.length; i++){
    markers_hamburger_ex_far[i].setVisible(true);
  }
}

function sethamburger7(){
  for(var i=0; i<markers_hamburger_others_near.length; i++){
    markers_hamburger_others_near[i].setVisible(true);
  }
}

function sethamburger8(){
  for(var i=0; i<markers_hamburger_others_nomal.length; i++){
    markers_hamburger_others_noaml[i].setVisible(true);
  }
}

function sethamburger9(){
  for(var i=0; i<markers_hamburger_others_far.length; i++){
    markers_hamburger_others_far[i].setVisible(true);
  }
}

function setkaraoke(){
  for(var i=0; i<markers_karaoke.length; i++){
    markers_karaoke[i].setVisible(true);
  }
}

function setkaraoke1(){
  for(var i=0; i<markers_karaoke_nomal_near.length; i++){
    markers_karaoke_nomal_near[i].setVisible(true);
  }
}

function setkaraoke2(){
  for(var i=0; i<markers_karaoke_nomal_nomal.length; i++){
    markers_karaoke_nomal_nomal[i].setVisible(true);
  }
}

function setkaraoke3(){
  for(var i=0; i<markers_karaoke_nomal_far.length; i++){
    markers_karaoke_nomal_far[i].setVisible(true);
  }
}

function setkaraoke4(){
  for(var i=0; i<markers_karaoke_ex_near.length; i++){
    markers_karaoke_ex_near[i].setVisible(true);
  }
}
function setkaraoke5(){
  for(var i=0; i<markers_karaoke_ex_nomal.length; i++){
    markers_karaoke_ex_nomal[i].setVisible(true);
  }
}

function setkaraoke6(){
  for(var i=0; i<markers_karaoke_ex_far.length; i++){
    markers_karaoke_ex_far[i].setVisible(true);
  }
}

function setkaraoke7(){
  for(var i=0; i<markers_karaoke_others_near.length; i++){
    markers_karaoke_others_near[i].setVisible(true);
  }
}

function setkaraoke8(){
  for(var i=0; i<markers_karaoke_others_nomal.length; i++){
    markers_karaoke_others_noaml[i].setVisible(true);
  }
}

function setkaraoke9(){
  for(var i=0; i<markers_karaoke_others_far.length; i++){
    markers_karaoke_others_far[i].setVisible(true);
  }
}

function setnetcafe(){
  for(var i=0; i<markers_netcafe.length; i++){
    markers_netcafe[i].setVisible(true);
  }
}

function setnetcafe1(){
  for(var i=0; i<markers_netcafe_nomal_near.length; i++){
    markers_netcafe_nomal_near[i].setVisible(true);
  }
}

function setnetcafe2(){
  for(var i=0; i<markers_netcafe_nomal_nomal.length; i++){
    markers_netcafe_nomal_nomal[i].setVisible(true);
  }
}

function setnetcafe3(){
  for(var i=0; i<markers_netcafe_nomal_far.length; i++){
    markers_netcafe_nomal_far[i].setVisible(true);
  }
}

function setnetcafe4(){
  for(var i=0; i<markers_netcafe_ex_near.length; i++){
    markers_netcafe_ex_near[i].setVisible(true);
  }
}
function setnetcafe5(){
  for(var i=0; i<markers_netcafe_ex_nomal.length; i++){
    markers_netcafe_ex_nomal[i].setVisible(true);
  }
}

function setnetcafe6(){
  for(var i=0; i<markers_netcafe_ex_far.length; i++){
    markers_netcafe_ex_far[i].setVisible(true);
  }
}

function setnetcafe7(){
  for(var i=0; i<markers_netcafe_others_near.length; i++){
    markers_netcafe_others_near[i].setVisible(true);
  }
}

function setnetcafe8(){
  for(var i=0; i<markers_netcafe_others_nomal.length; i++){
    markers_netcafe_others_noaml[i].setVisible(true);
  }
}

function setnetcafe9(){
  for(var i=0; i<markers_netcafe_others_far.length; i++){
    markers_netcafe_others_far[i].setVisible(true);
  }
}

//マーカー非表示

function hide(marker){
	for(var i=0; i<marker.length; i++){
    		marker[i].setVisible(false);
  	}
}

function hideMarkersAll(){
	hide(markers_cafe);
	hide(markers_famires);
	hide(markers_hamburger);
	hide(markers_karaoke);
	hide(markers_netcafe);
	
	hide(markers_cafe_nomal_near);
	hide(markers_cafe_nomal_nomal);
	hide(markers_cafe_nomal_far);
	hide(markers_cafe_ex_near);
	hide(markers_cafe_ex_nomal);
	hide(markers_cafe_ex_far);
	hide(markers_cafe_others_near);
	hide(markers_cafe_others_nomal);
	hide(markers_cafe_others_far);
	
	hide(markers_famires_nomal_near);
	hide(markers_famires_nomal_nomal);
	hide(markers_famires_nomal_far);
	hide(markers_famires_ex_near);
	hide(markers_famires_ex_nomal);
	hide(markers_famires_ex_far);
	hide(markers_famires_others_near);
	hide(markers_famires_others_nomal);
	hide(markers_famires_others_far);
	
	hide(markers_hamburger_nomal_near);
	hide(markers_hamburger_nomal_nomal);
	hide(markers_hamburger_nomal_far);
	hide(markers_hamburger_ex_near);
	hide(markers_hamburger_ex_nomal);
	hide(markers_hamburger_ex_far);
	hide(markers_hamburger_others_near);
	hide(markers_hamburger_others_nomal);
	hide(markers_hamburger_others_far);
	
	hide(markers_karaoke_nomal_near);
	hide(markers_karaoke_nomal_nomal);
	hide(markers_karaoke_nomal_far);
	hide(markers_karaoke_ex_near);
	hide(markers_karaoke_ex_nomal);
	hide(markers_karaoke_ex_far);
	hide(markers_karaoke_others_near);
	hide(markers_karaoke_others_nomal);
	hide(markers_karaoke_others_far);
	
	hide(markers_netcafe_nomal_near);
	hide(markers_netcafe_nomal_nomal);
	hide(markers_netcafe_nomal_far);
	hide(markers_netcafe_ex_near);
	hide(markers_netcafe_ex_nomal);
	hide(markers_netcafe_ex_far);
	hide(markers_netcafe_others_near);
	hide(markers_netcafe_others_nomal);
	hide(markers_netcafe_others_far);
  
}

function initMap() {
  console.log("xx3");
  var target = document.getElementById('map');  
  var latlng = {lat: 35.7217636, lng: 139.4667473};  //小平キャンパスの緯度経度
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 14
  });
  createData(kodaira_data.results);
  cafe();
  famires();
  hamburger();
  karaoke();
  netcafe();
  console.log("xx4");
}

/*
function initMap() {
  var target = document.getElementById('map');  
  var latlng = {lat: 35.7217636, lng: 139.4667473};  //小平キャンパスの緯度経度
  var map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 14
  });
    
  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
} */
