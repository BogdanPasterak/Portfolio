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
  console.log(this_one);
  const ground = document.getElementsByClassName("hideBP")[0];
  ground.style.filter = "blur(4px)";
};
