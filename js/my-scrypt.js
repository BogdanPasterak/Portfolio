/* my-script
* Bogdan Pasterak
* TODO: sctipt support Portfolio Udacity project
* 20/2/2018
*/


// TODO: Registration of the episodes for three colored squares of the menu

document.addEventListener("DOMContentLoaded", function(event) {
  const squeres = document.getElementsByClassName("squere");

  squeres[0].addEventListener("click", firstSquere);
  squeres[1].addEventListener("click", secondSquere);
  squeres[2].addEventListener("click", thirdSquere);

});

// TODO: The first is a bit transformed using css keyframes

const firstSquere = () => {
  const squereOne = document.getElementsByClassName("color-1")[0];

  squereOne.style.animation = "change-shape 5s 1";

  // turn off delayed for reuse
  setTimeout(function() {
    squereOne.removeAttribute("style");
    hideMenu();
  }, 5000);
};


// TODO: The second moves divs in the div feature

const secondSquere = () => {
  const boxFeature = document.getElementsByClassName("box-feature")[0];
  const feature = document.getElementsByClassName("feature")[0];
  // My challenge FadeOut and FadeIn without jQuery !!!
  boxFeature.style.animation = "fade-out 1s 1";

  // switching from position 1 to the end with smooth blanking
  setTimeout(function() {
    boxFeature.style.display = "none";
    feature.appendChild(boxFeature);
    boxFeature.style.animation = "fade-in 1s 1";
    boxFeature.style.display = "block";
  }, 900);

  // turn off delayed for reuse
  setTimeout(function() {
    boxFeature.removeAttribute("style");
  }, 1800);

  hideMenu();
};


// TODO: The third creates an additional snakes on the canvas

const thirdSquere = () => {
  snake = new Snake();
  snake.start();
  hideMenu();
};


// TODO: Two functions to operate the hide-away menu

const showMenu = () => {
	document.getElementsByClassName("hamburger")[0].style.display = "none";
	document.getElementsByTagName("aside")[0].style.left = "0";
};

const hideMenu = () => {
	if (document.documentElement.clientWidth <= 765) {
		document.getElementsByClassName("hamburger")[0].removeAttribute("style");
		document.getElementsByTagName("aside")[0].removeAttribute("style");
	}
};
