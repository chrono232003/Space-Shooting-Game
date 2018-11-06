var explosionS = new Audio("audio/explosion.mp3");

var xWindow = $(window).width();
var yWindow = $(window).height();
var posx = Math.floor((Math.random() * xWindow) + 1);
var posy = Math.floor((Math.random() * yWindow) + 1);

function Enemy(enemy) {
    var Enemypos = $('.' + enemy).offset();
    var xWindow = $(window).width();
    var yWindow = $(window).height();
////console.log("math: " + Math.random());
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

////console.log("math: " + posNegv + " " + posNegh);

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
          //console.log("coordenemy" + bulletCoord[0]);

          if (bulletCoord != null) {
            if ((bulletCoord[0] <= cEnemyLoc[0] + 75) && (bulletCoord[0] >= cEnemyLoc[0])) {
              if ((bulletCoord[1] <= cEnemyLoc[1] + 75) && (bulletCoord[1] >= cEnemyLoc[1])) {
                //console.log("bang!" + enemy);
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

function createEnemies(number) {
  for (var i = 1; i <= number; i++) {
      var className = "enemy" + i;
      $('.' + className).css({
          "top": posy,
          "left": xWindow
      });
      $('#enemy').append("<div class = " + className + "></div>");

      //design enemies on the fly
      $('.' + className).css({
          "position": "relative",
          "background-image": "url('images/enemy1.png')",
          "background-repeat": "no-repeat",
          "height": "75px",
          "width": "75px",
          //"left": "1400px"
      });
      Enemy(className);
  }
}
