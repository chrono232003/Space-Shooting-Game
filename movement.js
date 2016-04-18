$(document).ready(function(){
			$("#ship").focus();
			$(document).keydown(function(e) {
				
				//set initial position variables
				var wHeight = $( window ).height() - 100;
				var wWidth = $( window ).width() - 200;
				var pos = $("#ship").position();
				$("#shipPositionDisplay").text("height: " + wHeight + "width: " + wWidth + "vPostion: " + pos.top + " " + "hPostion: " + pos.left);
				console.log("this was hit: " + wHeight);
				
				//set the keycode variable and object
				var keyCode = e.keyCode || e.which;
				var keys = {up: 38, down: 40, left: 37, right: 39};
				
				//ship movement functions
				switch(keyCode) {
					case keys.up:
						if (pos.top > 0) {
							$("#ship").animate({ bottom : "+=50" }, 50);
						}
					break;
					
					case keys.down:
						if (wHeight >= pos.top + 30) {
							$("#ship").animate({ bottom : "-=50" }, 50);
						}
					break;
					
					case keys.left:
						if (pos.left > 0) {
						$("#ship").animate({ left : "-=50" }, 50);
						}
					break;
					
					case keys.right:
						if (wWidth >= pos.left + 30) {
						$("#ship").animate({ left : "+=50" }, 50);
						}
					break;
				}
						
		});
	});
