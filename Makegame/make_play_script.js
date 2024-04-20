const w = window.innerWidth;
const h = window.innerHeight;

l = localStorage.getItem('MakeGame:BlockList')

alert(l.length);
alert(l[0]);

function setup(){
  createCanvas(w,h)
}

function draw(){
  background(255,0,0);
}
