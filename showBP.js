let ob1;
let ob2;
/*
* showBP
* author Bogdan Pasterak
* 21/02/2018
* my lihgtbox version without jQuery
* pictures are enough to add showBP class
* background - hideBP
*/

document.addEventListener("DOMContentLoaded", function(event) {

//for each
  const pic = document.getElementsByClassName("showBP");

  for (let i = 0; i < pic.length; i++) {
    pic[i].onclick = function() {
      show(this);
    };
  }

});

const show = (this_one) => {
  const ground = document.getElementsByClassName("hideBP")[0];
  const body = document.getElementsByTagName("body")[0];
  const rect = this_one.getBoundingClientRect();
  const br = body.getBoundingClientRect();
  const w = window.innerWidth;
  const h = window.innerHeight;

  const startWidth = rect.width;
  const startHeight = rect.height;
  const startX = rect.x - br.x;
  const startY = rect.y -br.y;


  const clon = this_one.cloneNode(true);

  clon.style.width = startWidth + "px";
  clon.style.height = startHeight + "px";
  clon.style.position = "absolute"
  clon.style.left = (startX) + "px";
  clon.style.top = (startY) + "px";

  let scale = ((w / rect.width) < (h / rect.height)) ? w / rect.width : h / rect.height;
  console.log(w + "  " + h + "   sk = " + scale);
  scale = ((scale > 4) ? 4 : scale) * 0.95;
  scale = (scale > 1.2) ? scale * 0.9 : 1;
  const endWidth = startWidth * scale;
  const endHeight = startHeight * scale;
  const endX = (scale == 1) ? startX : (w - endWidth) / 2;
  const endY = (h - endHeight) / 2;

  ground.style.filter = "blur(4px)";
  body.appendChild(clon);

  let pos = 1;

  console.log(w + "  " + h + "   sk = " + scale);
  console.log(startWidth + "  " + startHeight + "  " + startX + "  " + startY);
  console.log(endWidth + "  " + endHeight + "  " + endX + "  " + endY);


  const id = setInterval( function() {
    if (pos <= 0) {
      clearInterval(id);
    } else {
      pos -= 0.01;
      clon.style.top = (endY + (startY - endY) * pos) + 'px';
      clon.style.left = (endX + (startX - endX) * pos) + 'px';
      clon.style.width = (endWidth + (startWidth - endWidth) * pos) + 'px';
      clon.style.height = (endHeight + (startHeight - endHeight) * pos) + 'px';
    }
  }, 7);



  ob1 = this_one;
  ob2 = clon;

};
