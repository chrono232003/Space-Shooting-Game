$(document).ready(function(){
		
		//create 20 small stars
		for(var i = 1; i<=20; i++) {
			var className = "smallStar" + i;
			$('.' + className).css({
				"opacity":"0",
			});
			$('#background').append("<div class = " + className + "></div>");
			Star(className, '2px');
		}
		
		//create 10 big stars
		for(var i = 1; i<=10; i++) {
			var className = "bigStar" + i;
			$('.' + className).css({
				"opacity":"0",
			});
			$('#background').append("<div class = " + className + "></div>");
			Star(className, '5px');
		}
		

	function Star(star, size) {
		var zWindow = $(window).height();
		var posy = Math.floor((Math.random() * zWindow) + 1); 

		$('.' + star).css({
				"top":posy + "px",
				"position":"absolute",
				"opacity":"1",
				"background-color":"white",
				"height":size,
				"width":size,
			});
		var speedCalc = 0;	
		if (size == "2px") {
			speedCalc = 50000;
		} else {
			speedCalc = 10000;
		}
		
		var speed = Math.floor(Math.random() * speedCalc);	
		$('.' + star).animate({
			"left": "-=1600px"
		}, speed, function() {
			$(this).css({
				"left":"1500px",
			});
			Star(star, size);
		});
	};
})