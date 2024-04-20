const w = window.innerWidth;
const h = window.innerHeight;

let l = [];

alert('play');

l = JSON.parse(localStorage.getItem('MakeGame:BlockList'));

const n_h = l.length;
const n_w = l[0].length;
const r = 30;

alert(l.length);
alert(l[0]);
alert('var:1');

function setup(){
  createCanvas(w,h)
}

function draw(){
  background(255);

  fill(255);
  for (let k = 0; k < n_h; k++){
    for (let k0 = 0; k0 < n_w; k0++){
      fill(255-100*l[k][k0]);
      rect(k0*r,k*r,r,r);
    }
  }
}
