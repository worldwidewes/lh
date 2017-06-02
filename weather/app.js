var APPID = "74dfce4c18911224e87dd40c07f61301";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var desc;

zip = prompt("What's your city/zip?");

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function updateByZip(zip){
	var url = "http://api.openweathermap.org/data/2.5/weather?" + 
		"zip=" + zip +
		"&appid=" + APPID;
	sendRequest(url);
}

function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.icon = data.weather[0].icon;
			weather.desc = toTitleCase(data.weather[0].description);
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.direction = degreesToDirection(data.wind.deg);
			weather.loc = data.name;
			weather.temp = K2F(data.main.temp);
			update(weather);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function K2F(k){
	return Math.round(k*(9/5) - 459.67);
}

function degreesToDirection(degrees){
	var range = 360/16;
	var low = 360 - range/2;
	var high = (low + range) % 360;
	var angles = ["N","NNE","ENE","NE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
	for (i in angles){
	if(degrees >= low && degrees < high){ //we are in the range)
		return angles[i];
	}
		
		low = (low + range) % 360;
		high = (high + range) % 360;
	}
	return "N";
}

function update(weather){
	wind.innerHTML = weather.wind;
	direction.innerHTML = weather.direction;
	humidity.innerHTML = weather.humidity;
	loc.innerHTML = weather.loc
	temp.innerHTML = weather.temp
	icon.src = "imgs/codes/" + weather.icon + ".png";
	desc.innerHTML = weather.desc;
}

window.onload = function() {
	temp = document.getElementById("temperature");
	loc = document.getElementById("location");
	icon = document.getElementById("icon");
	humidity = document.getElementById("humidity");
	wind = document.getElementById("wind");
	direction = document.getElementById("direction");
	desc = document.getElementById("desc");
	
	/*var weather = {};
	weather.wind = 3.5;
	weather.humidity = 35;
	weather.loc = "Santa Barbara";
	weather.temp = "45";
	weather.icon = 200;
	
	update(weather);*/
	
	updateByZip(zip);
}