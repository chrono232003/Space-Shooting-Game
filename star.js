/**
  This function defines the behavior of each star.
**/

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

function createStars(number, type, size) {
  for (var i = 1; i <= number; i++) {
      var className = type + i;
      $('.' + className).css({
          "opacity": "0",
      });
      $('#background').append("<div class = " + className + "></div>");
      Star(className, size);
  }
}
