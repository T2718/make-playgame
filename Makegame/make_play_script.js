const w = window.innerWidth;
const h = window.innerHeight;

alert('Play')

console.log(localStorage.getItem('MakeGame:BlockList'))

function setup(){
  createCanvas(w,h)
}

function draw(){
  background(255,0,0);
}
