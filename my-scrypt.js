/* my-script
* Bogdan Pasterak
* TODO: sctipt support Portfolio Udacity project
* 20/2/2018
*/

document.addEventListener("DOMContentLoaded", function(event) {
  const squeres = document.getElementsByClassName("squere");

  squeres[0].addEventListener("click", firstSquere);
});

const firstSquere = () => {
  const squereOne = document.getElementById("color-1");

  squereOne.style.animation = "change-shape 5s 1";

  // turn off delayed for reuse
  setTimeout(function() {
    squereOne.removeAttribute("style");
  }, 5000);
};

// TODO: Two functions to operate the hide-away menu

const showMenu = () => {
	document.getElementById("hamburger").style.display = "none";
	document.getElementsByTagName("aside")[0].style.left = "0";
};

const hideMenu = () => {
	if (document.documentElement.clientWidth <= 765) {
		document.getElementById("hamburger").removeAttribute("style");
		document.getElementsByTagName("aside")[0].removeAttribute("style");
	}
};
