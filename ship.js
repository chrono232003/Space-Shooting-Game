var laserS = new Audio("audio/laser.mp3");

function initShipControls() {
  $(document).keydown(function (e) {

      //set initial ship position variables
      var wHeight = $(window).height() - 100;
      var wWidth = $(window).width() - 200;

      var shipPos = $("#ship").position();
      $("#shipPositionDisplay").text("height: " + wHeight + "width: " + wWidth + "vPostion: " + shipPos.top + " " + "hPostion: " + shipPos.left);
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
}
