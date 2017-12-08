var today = new Date();
		var hourNow = today.getHours();
		var greeting;
		
		if (hourNow > 18){
		greeting = 'Good evening';
		} else if(hourNow > 12) { 
		greeting = 'Good afternoon';
		} else if(hourNow > 0){
		greeting = 'Good morning';
		} else {
		greeting = 'Welcome';
		}
		//document.write('<p style="font-size:45%">' + greeting + " the time is " + today + '<p>');
		
function popup(){
	alert("You opened a popup!")
	}
	
	
function randNum() {
    document.getElementById("demo2").innerHTML = "You rolled " + Math.floor(Math.random() * 12 + 1);
}




 function largestOfFour(arr) {
  var results = [];
  for (var n = 0; n < arr.length; n++) {
    var largestNumber = 0;
    for (var sb = 0; sb < arr[n].length; sb++) {
      if (arr[n][sb] > largestNumber) {
        largestNumber = arr[n][sb];
      }
    }

    results[n] = largestNumber;
  }

  return results;
}