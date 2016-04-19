$(document).ready(function () {
	//create sound effects
	var explosionS = new Audio("explosion.mp3");
	var laserS = new Audio("laser.mp3");
//Background//

    //create 20 small stars
    for (var i = 1; i <= 20; i++) {
        var className = "smallStar" + i;
        $('.' + className).css({
            "opacity": "0",
        });
        $('#background').append("<div class = " + className + "></div>");
        Star(className, '2px');
    }

    //create 10 big stars
    for (var i = 1; i <= 10; i++) {
        var className = "bigStar" + i;
        $('.' + className).css({
            "opacity": "0",
        });
        $('#background').append("<div class = " + className + "></div>");
        Star(className, '5px');
    }


    function Star(star, size) {
        var zWindow = $(window).height();
        var posy = Math.floor((Math.random() * zWindow) + 1);

        $('.' + star).css({
            "top": posy + "px",
            "position": "absolute",
            "opacity": "1",
            "background-color": "white",
            "height": size,
            "width": size,
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
        }, speed, function () {
            $(this).css({
                "left": "1500px",
            });
            Star(star, size);
        });
    };

//ship//

	//focus on ship onload of page (currently not working ;/)
    $("#ship").focus();
    $(document).keydown(function (e) {

        //set initial ship position variables
        var wHeight = $(window).height() - 100;
        var wWidth = $(window).width() - 200;
		
        var shipPos = $("#ship").position();
        $("#shipPositionDisplay").text("height: " + wHeight + "width: " + wWidth + "vPostion: " + shipPos.top + " " + "hPostion: " + shipPos.left);
;
        //set the keycode variable and object
        var keyCode = e.keyCode || e.which;
        var keys = { up: 38, down: 40, left: 37, right: 39, fire: 32 };

        switch (keyCode) {
            //ship input functions and keyboard controls
            case keys.up:
                if (shipPos.top > 0) {
                    $("#ship").animate({ bottom: "+=10" }, 50);
                }
                break;

            case keys.down:
                if (wHeight >= shipPos.top + 30) {
                    $("#ship").animate({ bottom: "-=10" }, 50);
                }
                break;

            case keys.left:
                if (shipPos.left > 0) {
                    $("#ship").animate({ left: "-=10" }, 50);
                }
                break;

            case keys.right:
                if (wWidth >= shipPos.left + 30) {
                    $("#ship").animate({ left: "+=10" }, 50);
                }
                break;

            //ship action functions
            case keys.fire:
				laserS.play();
                $("#bullet").css({
                    "opacity": "1",
                    "left": shipPos.left + 30,
                    "top": shipPos.top + 30
                });

                $("#bullet").animate({
                    "left": "+=1600px"
                },
				{

					    step: function (now, fx) {
					        var BPos = $(this).position();
					         cBulletLoc = BPos.top + ',' + BPos.left;
					        $("#bulletPositionDisplay").text(cBulletLoc);
							if ($("#hit").text() == "hit") {
								$("#bullet").css({ "left":"1600px" });
								$("#hit").text("");
							}
					    },
						duration:500,
						complete: function() {
							$("#bulletPositionDisplay").text("");
						}
							
				});
				break;
        }
    });

//enemy//

    //universal variable
    var xWindow = $(window).width();
    var yWindow = $(window).height();
    var posx = Math.floor((Math.random() * xWindow) + 1);
    var posy = Math.floor((Math.random() * yWindow) + 1);


    //create 5 Enemies (this will soon turn into a function so that the number of enemies can be dynamic)
    for (var i = 1; i <= 5; i++) {
        var className = "enemy" + i;
        $('.' + className).css({
            "top": posy,
            "left": xWindow
        });
        $('#enemy').append("<div class = " + className + "></div>");

        //design enemies on the fly
        $('.' + className).css({
            "position": "relative",
            "background-image": "url('enemy1.png')",
            "background-repeat": "no-repeat",
            "height": "75px",
            "width": "75px",
            //"left": "1400px"
        });
        Enemy(className);
    }


    function Enemy(enemy) {
        var Enemypos = $('.' + enemy).offset();
        var xWindow = $(window).width();
        var yWindow = $(window).height();
		//console.log("math: " + Math.random());
        var posx = Math.floor((Math.random() * xWindow) + 1);
        var posy = Math.floor((Math.random() * yWindow) + 1);
        //var posx = Math.floor(((Math.random() * xWindow) + 1)/2);
        //var posy = Math.floor(((Math.random() * yWindow) + 1)/2);

        // assign random operatior to the horizontal and vertical controls
		function assignOperator() {
            if (Math.random() > parseFloat(0.5)) { 
				return "+="; 
			} else { 
				return "-="; 
			}
        }
        var posNegv = assignOperator();
        var posNegh = assignOperator();
		
		console.log("math: " + posNegv + " " + posNegh);

        //check and make sure next horizontal move will not go off of the screen
        var checkh = false
        if (posNegh == "+=") {
            checkh = (xWindow > (Enemypos.left + posx));
        } else {
            checkh = (0 < (Enemypos.left - posx));
        }

        //check and make sure next vertical move will not go off of the screen
        var checkv = false
        if (posNegv == "+=") {
            checkv = (yWindow > ((Enemypos.top) + posx));
        } else {
            checkv = (0 < (Enemypos.top - posy));
        }

        //set movement
        var hMove = "";
        var vMove = "";
        if (checkh) { hMove = posx; } else { hMove = "0"; }
        if (checkv) { vMove = posy; } else { vMove = "0"; }

        //var speed = Math.floor(Math.random() * 5000);	
        $('.' + enemy).animate({
            "left": posNegh + "" + hMove + "px",
            "top": posNegv + "" + vMove + "px"
        },
		{
			duration:1000,
			step: function (now, fx) {

					        var enemyPos = $(this).position();
					        cEnemyLoc = [enemyPos.top,enemyPos.left];
							bulletCoord = $("#bulletPositionDisplay").text().split(",");
							console.log("coordenemy" + bulletCoord[0]);
							
							if (bulletCoord != null) {
								if ((bulletCoord[0] <= cEnemyLoc[0] + 75) && (bulletCoord[0] >= cEnemyLoc[0])) {
									if ((bulletCoord[1] <= cEnemyLoc[1] + 75) && (bulletCoord[1] >= cEnemyLoc[1])) {
										console.log("bang!" + enemy);
										$("#hit").text("hit");
										//enemy explosion then disappear
										$(enemy).removeClass('.' + enemy);
										explosionS.play();
										$('.' + enemy).css({
											"background-image": "url('explosion.gif  ')",
											"height":"95px",
											"width":"150px"
										});
										$('.' + enemy).stop();
										setTimeout(function() {								
										$('.' + enemy).remove();
										}, 1000);
										return false;
									}
								}
							}
					    },
			complete: function() {
				//$(this).delay( 200 );
				Enemy(enemy);
			}
        });
    };
})
