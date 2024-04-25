let canvas_id = document.getElementById('canvas');
let body_id = document.body;

document.addEventListener("gesturestart", (e) => {
  e.preventDefault();
});

window.addEventListener("scroll", (e) => {
  //body_id.style.overflow = 'hidden';
  e.preventDefault();
});

let main_id = document.getElementById('main');


const w_all = window.innerWidth;
const h_all = window.innerHeight;

let n_w = 30;
let n_h = 15;
const r = 30;
let w = n_w*r;
let h = n_h*r;
let t = [];
let t_m = [];

let me_x = 2.5;
let me_y = 6.5;

//[[]]←H,W
let l = [];
let t_num = 0;

main_id.style.top = String(h+100)+"px";
//main_id.style.top = "0px";
main_id.style.fontSize = "30px";
//alert(main_id.style.top)

for (let k = 0; k < n_h; k++){
  l.push([]);
  for (let k0 = 0; k0 < n_w; k0++){
    l[l.length-1].push(0);
  }
}


let Line = true;

function setup() {
  let canvas = createCanvas(w,h+100);
  canvas.parent('canvas');
}

function draw_back(){
  noStroke();
  fill(220);
  rect(0,h,w,100);

  if(Line == true){
    strokeWeight(0.5);
    stroke(180);
    for(let k = 1; k < n_w; k++){
      line(k*r,0,k*r,h);
    }
    for(let k = 1; k < n_h; k++){
      line(0,k*r,w,k*r);
    }
  }

  noStroke();
  fill(255,0,0);
  rect(25,h+25,100,50);
}



function touch_func(){
  if(t_m.length == 0) return;
  //console.log(0 <= t_m[0].x && t_m[0].x <= w && 0 <= t_m[0].y && t_m[0].y <= h)
  if(0 <= t_m[0].x && t_m[0].x <= w && 0 <= t_m[0].y && t_m[0].y <= h){
    l[floor(t_m[0].y/r)][floor(t_m[0].x/r)] = t_num;

    console.log(l[floor(t_m[0].y/r)][floor(t_m[0].x/r)])
  }
}

function draw_block(){
  for (let k = 0; k < n_h; k++){
    for (let k0 = 0; k0 < n_w ; k0++){
      noStroke();
      fill(255-100*l[k][k0]);
      rect(k0*r,k*r,r,r);
    }
  }
}




function draw() {
  //console.log(t[0]);
  //background(220);
  clear();
  body_id.style.overflow = 'auto';
  strokeWeight(1);
  stroke(0);
  fill(255)
  rect(0,0,w,h);

  draw_block();

  draw_back();



}

function touchStarted(){
  t = touches;
  t_m = touches;
  if(0 <= t_m[0].x && t_m[0].x <= w && 0 <= t_m[0].y && t_m[0].y <= h){
    t_num = 1-l[floor(t_m[0].y/r)][floor(t_m[0].x/r)];
  }
  if(25 <= t[0].x && t[0].x <= 125 && h+25 <= t[0].y && t[0].y <= h+75){
    const json_k = serializedArray = JSON.stringify(l);
    localStorage.setItem('MakeGame:BlockList',json_k);
    let l_k = '1'+l.join('').replaceAll(',','');
    l_k = BigInt("0b"+l_k).toString();
    let l_k0 = ""
    try{
      l_k0 = [me_x-0.5,me_y-0.5,n_h,n_w,2].join('-')
    } catch(e) {
      alert("ParseError:"+e)
    }
    l_k = l_k0+"-"+l_k;
    //alert(l_k);
    //alert();
    window.location.href = "./make_play?l="+l_k;
  }
  touch_func();
}

function touchMoved(){
  t_m = touches;
  touch_func();
}

function touchEnded(){
  t = touches;
  t_m = touches;
}
