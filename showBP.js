/*
* showBP
* author Bogdan Pasterak
* 21/02/2018
* my lihgtbox version without jQuery
* pictures are enough to add showBP class
* background - hideBP deeper than body
*/

// TODO: shows clicked objects in a possible large format,
// blurring the background

// on start
document.addEventListener("DOMContentLoaded", function(event) {

  // collection of objects for presentation
  const pic = document.getElementsByClassName("showBP");

  // registration of events for objects (passing this)
  for (let i = 0; i < pic.length; i++) {
    pic[i].onclick = function() {
      show(this);
    };
  }

});

// after clicking, display the object
const show = (this_one) => {
  // constants
  const ground = document.getElementsByClassName("hideBP")[0];
  const body = document.getElementsByTagName("body")[0];
  const initialRect = this_one.getBoundingClientRect();
  const bodyRect = body.getBoundingClientRect();
  // variable (starting position)
  let tempX = initialRect.x - bodyRect.x;
  let tempY = initialRect.y - bodyRect.y;

  // copy of object
  const clon = this_one.cloneNode(true);

  // setting above the original
  clon.style.width = initialRect.width + "px";
  clon.style.position = "absolute"
  clon.style.left = (tempX) + "px";
  clon.style.top = (tempY) + "px";

  // calculation of the enlargement
  let scale = ((window.innerWidth / initialRect.width) < (window.innerHeight / initialRect.height)) ? window.innerWidth / initialRect.width : window.innerHeight / initialRect.height;
  console.log(window.innerWidth + "  " + window.innerHeight + "   sk = " + scale);
  scale = ((scale > 4) ? 4 : scale) * 0.95;
  scale = (scale > 1.2) ? scale * 0.9 : 1;

  // targets of the object after transformation
  const endWidth = initialRect.width * scale;
  const endX = (scale == 1) ? tempX : (window.innerWidth - endWidth) / 2;
  const endY = (window.innerHeight - initialRect.height * scale) / 2;

  // blurring the background
  ground.style.filter = "blur(4px)";
  // adding clon
  body.appendChild(clon);

  // transformation counter
  let pos = 1;

  tempX -= endX;
  tempY -= endY;

  // transformation loop with interval 0.07 sec.
  const id = setInterval( function() {
    if (pos <= 0) {
      clearInterval(id);
    } else {
      pos -= 0.01;
      clon.style.top = (endY + tempY * pos) + 'px';
      clon.style.left = (endX + tempX * pos) + 'px';
      clon.style.width = (endWidth + (initialRect.width - endWidth) * pos) + 'px';
      // clon.style.height = (endHeight + (initialRect.height - endHeight) * pos) + 'px';
    }
  }, 7);

};
