let snake;
let way = 1;
let step = 0;
let interval;
let clear;
let change;
let sec;
let ctxClock;
let offImg;
let onImg;

document.addEventListener("DOMContentLoaded", function(event) {

	window.addEventListener("resize", myResize);
	myResize();


	if (document.getElementById('container').contains(document.getElementById('game'))) {

		initCanvas();

		snake = new Snake();

		for(let i = 0; i<1000; i++){
			Point.setRandFood();
			if ( i % 2 == 0 )
				Point.setRandHurdle();
			//Snake.randFood();
		}

		snake.start(30);

	}
	//initGame();

});

const myResize = () => {

};


const initCanvas = () => {

	const c = document.getElementById("canvas");

	const g = document.getElementById("game").getBoundingClientRect();

	c.width = (g.width & 0xFFFE) - 10 ;
	c.height = (g.height & 0xFFFE) - 10 ;

	const ctx = c.getContext('2d');

	let point = new Point();
	Point.setCTX(ctx);

	// static method for static variable

	ctx.beginPath();
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	ctx.lineWidth = 2;
	ctx.rect(1, 1, c.width - 2, c.height - 2);
	ctx.stroke();
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(2, 2, c.width - 4, c.height - 4);


};
