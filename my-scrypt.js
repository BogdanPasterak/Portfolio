/* my-script
* Bogdan Pasterak
* TODO: sctipt support Portfolio Udacity project
* 20/2/2018
*/

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
