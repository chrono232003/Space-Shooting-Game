$(document).ready(function(){
	$("#ship").focus();
	$(document).keydown(function(e) {
			
		//set initial position variables
		var wHeight = $( window ).height() - 100;
		var wWidth = $( window ).width() - 200;
		//$("#ship").css({"margin-top":"300px"});
		var pos = $("#ship").position();
		$("#shipPositionDisplay").text("height: " + wHeight + "width: " + wWidth + "vPostion: " + pos.top + " " + "hPostion: " + pos.left);
		//console.log("this was hit: " + wHeight);
		
		//set the keycode variable and object
		var keyCode = e.keyCode || e.which;
		var keys = {up: 38, down: 40, left: 37, right: 39, fire: 32};
		
		switch(keyCode) {
			//ship input functions
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
			
			//ship action functions
			case keys.fire:
				$("#bullet").css({
				"opacity":"1",
				"left":pos.left + 30,
				"top":pos.top + 30
				});
				
				$("#bullet").animate({
					"left": "+=1600px"
					},
					{
                               
						step: function(now, fx) {
							
							var BPos = $(this).position();
						
							var data = BPos.top + ', ' + BPos.left;
							//$("#shipPositionDisplay").append('<p>' + data + '</p>');
							//need above: currently working on colision detection
						  
						}
                                  
					});
					
					
					
					// 500, function() {
						// var BPos = $(this).position();
						// $("#shipPositionDisplay").append('<p>' + BPos + '</p>');
						// $(this).stop();
				// });
			break;
		}	
	});
});
