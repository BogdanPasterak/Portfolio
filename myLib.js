

// TODO: A point object and a chain of function prototypes for it
const Point = function (point) {
  if (point == undefined) {
    this.x = 0;
    this.y = 0;
  } else {
    this.x = point.x;
    this.y = point.y;
  }
  Point.ctx;  // Static variable
  Point.px;
  Point.py;
  // Static method
  Point.setCTX = function(ctx) {
    Point.ctx = ctx;
  }
  Point.setRandFood = function(){
    Point.px = (Math.random()*((Point.ctx.canvas.clientWidth>>1)-2)+1)|0;
    Point.py = (Math.random()*((Point.ctx.canvas.clientHeight>>1)-2)+1)|0;
    Point.ctx.fillStyle = 'rgb(0, 255, 0)';
    Point.ctx.fillRect(Point.px << 1, Point.py << 1, 2, 2);
 }
  Point.setRandHurdle = function(){
    Point.px = (Math.random()*((Point.ctx.canvas.clientWidth>>1)-2)+1)|0;
    Point.py = (Math.random()*((Point.ctx.canvas.clientHeight>>1)-2)+1)|0;
    Point.ctx.fillStyle = 'rgb(255, 0, 0)';
    Point.ctx.fillRect(Point.px << 1, Point.py << 1, 2, 2);
 }
};
Point.prototype.getX = function() {
  return this.x;
};
Point.prototype.getY = function() {
  return this.y;
};
Point.prototype.setX = function(x) {
  this.x = x;
};
Point.prototype.setY = function(y) {
  this.y = y;
};
Point.prototype.setXY = function(x, y) {
  this.x = x;
  this.y = y;
};
Point.prototype.set = function(obj) {
  if (obj.hasOwnProperty('x') && obj.hasOwnProperty('y')) {
    this.x = obj.x;
    this.y = obj.y;
  } else {
    console.log('Error!    Object:' + obj + '  does not have x and y property');
  }
};
Point.prototype.get = function() {
  return this;
};
Point.prototype.setColor = function(color) {
  Point.ctx.fillStyle = color;
  Point.ctx.fillRect(this.x << 1, this.y << 1, 2, 2);
}
Point.prototype.getColor = function() {
  const data = Point.ctx.getImageData(this.x << 1, this.y << 1, 1, 1);
  return 'rgb(' + data.data[0] + ', ' + data.data[1] + ', ' + data.data[2] + ')';
}

Point.prototype.toString = function() {
  return 'Point {x: ' + this.x + ', y: ' + this.y + ', ctx: ' + Point.ctx + '} ';
};
Point.prototype.equals = function(p2) {
  return (p2 instanceof Point && this.x === p2.x && this.y === p2.y);
};
Point.prototype.copy = function(p2) {
  this.x = p2.getX();
  this.y = p2.getY();
};


// TODO: Auxiliary procedure, change of the color recording format,
//  e.g. 'rgb(255, 128, 0)' to '#ff8000'
const rgbToHex = (color) => {
  const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
      r = parseInt(nums[2], 10).toString(16),
      g = parseInt(nums[3], 10).toString(16),
      b = parseInt(nums[4], 10).toString(16);
  return "#" + (r.length == 1 ? "0"+ r : r) + (g.length == 1 ? "0"+ g : g) + (b.length == 1 ? "0"+ b : b);
};






const Snake = function() {
  this.body = [new Point(), new Point(), new Point()];
  this.head = this.body[0];
  this.eye = new Point();
  this.way = 0;
  this.speed = 0;
  this.step = 0;
  this.interval;
  this.sees = {f: '', l: '', r: '', ff: '', fff: ''};
  Snake.see = {
    head: 'rgb(0, 0, 0)',
    body: 'rgb(128, 128, 128)',
    hurdle: 'rgb(255, 0, 0)',
    food: 'rgb(0, 255, 0)',
    none: 'rgb(255, 255, 255)',
    over: 'undefined'};

  // set 3 parts of body
  for (let i = 0; i < 3; i++) {
    this.body[i].setX(3 - i);
    this.body[i].setY(1);
  }
};

Snake.prototype.start = function(speed) {
  // if not set make 1/5 second
  if (speed === undefined) { speed = 50;}
  else {
    if (this.interval != undefined){
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        this.draw();
      }.bind(this), speed);
    }
  }
  this.speed = speed;
  console.log("Snake speed is seting:" + this.speed);
  if (this.interval === undefined) {
    this.interval = setInterval(function() {
      this.draw();
    }.bind(this), speed);
    console.log("Snake start");
  } else {
    console.log("Snake already going");
  }
};

Snake.prototype.stop = function(speed) {
  clearInterval(this.interval);
  this.interval = undefined;
  console.log("Snake stop");
};

Snake.prototype.draw = function() {

  this.step++;

  // erase till
  this.body[this.body.length-1].setColor('rgb(255, 255, 255)');

  // decreases
  if (this.step % 100 == 0){
    this.body.pop();
    if (this.body.length < 1){
      console.log("Snake died of hunger");
      this.stop();
    } else {
      this.body[this.body.length-1].setColor('rgb(255, 255, 255)');
    }
  }

  // move snake
  for(let i = this.body.length - 1; i > 0; i--) {
    this.body[i].x = this.body[i - 1].x;
    this.body[i].y = this.body[i - 1].y;
  }


  this.where();
  this.front(this.head);

  this.sees.f = this.head.getColor();

  // step on ...
  if (this.sees.f != Snake.see.none) {
    if (this.sees.f == Snake.see.food) {
      //console.log('mniam  rosne');
      this.body.push(new Point(this.body[this.body.length-1]));
      Point.setRandFood();
      if (this.step % 2 == 0) {
        Point.setRandHurdle();
        Point.setRandFood();
      }
   } else if (this.sees.f == Snake.see.hurdle) {
      console.log("Snake died on hurdle");
      this.stop();
    } else if (this.sees.f == Snake.see.over) {
      console.log("Snake died because escape");
      this.stop();
    } else {
      console.log(this.head.getColor());
    }
  }


  // draw
  this.head.setColor('rgb(0, 0, 0)');
  for(let i = 1; i < this.body.length; i++) {
    this.body[i].setColor('rgb(128, 128, 128)');
  }

};

Snake.prototype.where = function() {

  this.eye.copy(this.head);
  this.front(this.eye);
  this.sees.f = this.eye.getColor();
  this.front(this.eye);
  this.sees.ff = this.eye.getColor();
  this.front(this.eye);
  this.sees.fff = this.eye.getColor();

  this.eye.copy(this.head);
  this.left(this.eye);
  this.sees.l = this.eye.getColor();
  this.front(this.eye);
  this.sees.fl = this.eye.getColor();

  this.eye.copy(this.head);
  this.right(this.eye);
  this.sees.r = this.eye.getColor();
  this.front(this.eye);
  this.sees.fr = this.eye.getColor();


  if (this.sees.f == Snake.see.hurdle) {
    // przeszkoda przed glowa musi skrecic;
    // w prawo lub lewo inaczej utknie
    if (this.sees.l == Snake.see.hurdle) {
      this.way = ++this.way & 7;
    } else if (this.sees.r == Snake.see.hurdle) {
      this.way = --this.way & 7;
    } else {
      // losowo skret
      if (Math.random() * 2 <1)
        this.way = ++this.way & 7;
      else
        this.way = --this.way & 7;
      }
  } else if (this.sees.f == Snake.see.food) {
    // jest lakomy napewno zje, nie skreca!
  } else if (this.sees.f == Snake.see.none) {
    // jesli nic nie widzi z przodu ...
    if (this.sees.l == Snake.see.food) {
      // jedzenie po lewej
      this.way = --this.way & 7;
    } else if (this.sees.r == Snake.see.food) {
      // jedzenie po prawej
      this.way = ++this.way & 7;
    } else if (this.sees.ff == Snake.see.hurdle) {
      // dwa kroki do przodu, przeszkoda
      if (this.sees.l == Snake.see.hurdle) {
        // skosny mur jade w druga
        this.way = ++this.way & 7;
      } else if (this.sees.r == Snake.see.hurdle) {
        // skosny mur jade w druga
          this.way = --this.way & 7;
      } else if ((this.sees.fr == Snake.see.hurdle || this.sees.fr == Snake.see.over)
        && (this.sees.fl == Snake.see.hurdle || this.sees.fl == Snake.see.over)) {
        // mur na wprost losuje gdzie skrecic
        if (Math.random() * 2 <1)
          this.way = ++this.way & 7;
        else
          this.way = --this.way & 7;
      }
    } else {
      // nie ma przeszkod ani jedzenia, co dalej ?
      if (Math.random() * 30 < 1) {
        if (this.sees.l == Snake.see.hurdle) {
          // moge tylko w prawo
          this.way = ++this.way & 7;
        } else if (this.sees.r == Snake.see.hurdle) {
          // moge tylko w lewo
          this.way = --this.way & 7;
        } else if (!(this.sees.fr==Snake.see.hurdle || this.sees.fr==Snake.see.over)
        && !(this.sees.fl==Snake.see.hurdle || this.sees.fl==Snake.see.over)) {
          // w jedna z dwoch, dalej terz nie ma przeszkod
          if (Math.random() * 2 <1)
            this.way = ++this.way & 7;
          else
            this.way = --this.way & 7;
        }
      }
    }
  }
};

Snake.prototype.front = function(point) {

  if (this.way == 0 || this.way == 7 || this.way ==1) { point.x++; }
  if (this.way == 4 || this.way == 3 || this.way ==5) { point.x--; }
  if (this.way == 2 || this.way == 1 || this.way ==3) { point.y++; }
  if (this.way == 6 || this.way == 5 || this.way ==7) { point.y--; }
};
Snake.prototype.left = function(point) {

  this.way = --this.way & 7;
  this.front(point);
  this.way = ++this.way & 7;
};
Snake.prototype.right = function(point) {

  this.way = ++this.way & 7;
  this.front(point);
  this.way = --this.way & 7;
};
