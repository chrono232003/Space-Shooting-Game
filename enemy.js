$(document).ready(function(){
	
		//universal variable
		var xWindow = $(window).width();
		var yWindow = $(window).height();
		var posx = Math.floor((Math.random() * xWindow) + 1);
		var posy = Math.floor((Math.random() * yWindow) + 1);
		
		
		//create 5 Enemies
		for(var i = 1; i<=5; i++) {
			var className = "enemy" + i;
			$('.' + className).css({
				"top":posy,
				"left":xWindow
			});
			$('#enemy').append("<div class = " + className + "></div>");
			
			//design enemies on the fly
			$('.' + className).css({
			  "position":"relative",
			  "background-image": "url('enemy1.png')",
			  "background-repeat": "no-repeat",
			  "height":"100px",
			  "width":"100px",
			  //"left": "1400px"
			});
			Enemy(className);
		}
	
	
		function Enemy(enemy) {
			var pos = $('.' + enemy).position();
			var xWindow = $(window).width();
			var yWindow = $(window).height();
			var posx = Math.floor((Math.random() * xWindow) + 1);
			var posy = Math.floor((Math.random() * yWindow) + 1);
			//var posx = Math.floor(((Math.random() * xWindow) + 1)/2);
			//var posy = Math.floor(((Math.random() * yWindow) + 1)/2);
			
			// assign random operatior to the horizontal and vertical controls
			posNegv = "";
			posNegh = "";
			function assignOperator(posNeg) {
				(Math.random() > .5) ? posNeg = "+=" : posNeg = "-=";
			}
			
			assignOperator(posNegv);
			assignOperator(posNegh);
			
			//check and make sure next horizontal move will not go off of the screen
			 var checkh = false
			 if (posNegh == "+=") {
				checkh = (xWindow > (pos.left + posx));
			 } else {
				checkh = (0 > (pos.left - posx)); 
			 }
			 
			 //check and make sure next vertical move will not go off of the screen
			 var checkv = false
			 if (posNegv == "+=") {
				checkv = (yWindow > ((pos.top - 100) + posx));
			 } else {
				checkv = (0 < (pos.top - posy));
			 }
		
			//set movement
			var hMove = "";
			var vMove = "";
			if (checkh) { hMove = posx; } else {hMove = "0";}
			if (checkv) { vMove = posy; } else {vMove = "0";}
		
			//var speed = Math.floor(Math.random() * 5000);	
			$('.' + enemy).animate({
					"left": posNegh + "" + hMove + "px",
					"top":  posNegv + "" + vMove + "px"
			}, 1000, function() {
				Enemy(enemy);
			});
	};
	
	
});