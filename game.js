$(document).ready(function () {
/**Background (star.js) **/
//create 20 small stars
createStars(20, 'smallStar', '2px');

//create 10 big stars
createStars(10, 'bigStar', '5px');

/**ship**/

	//focus on ship onload of page (currently not working ;/)
    $("#ship").focus();
		initShipControls();

/**create enemies enemy.js**/
//create 5 Enemies (this will soon turn into a function so that the number of enemies can be dynamic)
createEnemies(5);

})
