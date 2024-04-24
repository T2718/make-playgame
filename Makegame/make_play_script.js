alert('V:1.00.01');
const w = window.innerWidth;
const h = window.innerHeight;

let l = [];
//lは[[◯*W]*H]個で入っている

l = JSON.parse(localStorage.getItem('MakeGame:BlockList'));


const n_h = l.length;
const n_w = l[0].length;
let r = 30;
let left = 0;
let touch_x = [];
let touch_y = [];
let touch_num = 0;
let v_x = 8;
let v_x_origin = 8;
let v_y = 0;
//let hit_tf = true;
const jump_v = -7;
const g = 6;
let start_time = Date.now();
let time_delta = Date.now()-start_time;
let double_touch_start = Date.now();
let double_touch_tf = false;

if(n_h/n_w > h/w){
  //hがぴったり
  r = h/n_h;
  left = parseInt((w-r*n_w)/2);
} else {
  //wがぴったり
  r = w/n_w;
}

//左上基準
let me_x = 2.5;
let me_y = 12.5;





function setup(){
  createCanvas(w,h)
}





function draw_all(){
  fill(255);
  strokeWeight(1);
  stroke(145);
  for (let k = 0; k < n_h; k++){
    for (let k0 = 0; k0 < n_w; k0++){
      fill(255-100*l[k][k0]);
      rect(left+k0*r,k*r,r,r);
    }
  }

  noStroke();
  fill(0,0,255);
  rect(r*(me_x-0.5),(me_y-0.5)*r,r,r);
}







function hit(){
  strokeWeight(3);
  stroke(0,0,255);
  textSize(50);
  let list_k = [];
  for(let k = 0; k < n_h; k++){
    for(let k0 = 0; k0 < n_w; k0++){
      console.log(l[k][k0])
      if(l[k][k0] == 1){
        //上
        if((k0 < me_x+0.5 && me_x-0.5 < k0+1) && (me_y+0.5 > k && k+0.5 > me_y+0.5)){
          v_y = 0;
          me_y = k-0.5;
          //hit_tf = true;
        }
        //右
        //list_k.push(me_x-0.5 > k0 && k0+1 > me_x-0.5)
        if((k < me_y+0.5 && me_y-0.5 < k+1) && (me_x-0.5 > k0+0.5 && k0+1 > me_x-0.5)){
          v_x = 0;
          me_x = k0+1.5;
        }
        //左
        //list_k.push(me_x-0.5 > k0 && k0+1 > me_x-0.5)
        if((k < me_y+0.5 && me_y-0.5 < k+1) && (me_x+0.5 < k0+0.5 && k0 < me_x+0.5)){
          v_x = 0;
          me_x = k0-0.5;
        }
        //下
        if((k0 < me_x+0.5 && me_x-0.5 < k0+1) && (me_y-0.5 < k+1 && k+0.5 < me_y-0.5)){
          v_y = 0;
          me_y = k+1.5;
          //hit_tf = true;
        }
      }
    }
  }
  //text(list_k.toString(),100,100);
}



function value_calc(){

  //Touch操作
  if(touch_num >= 1){
    if(Date.now()-double_touch_start >= 100 && double_touch_tf == false){
      if(touch_num >= 2){
        if(Math.sign(touch_x[0]-w/2) != Math.sign(touch_x[1]-w/2)){
          v_y = jump_v;
          //hit_tf = false;
        }
      }
      if(touch_x[0] <= w/2){
        v_x = -v_x_origin;
        me_x += v_x*time_delta;
      } else {
        v_x = v_x_origin;
        me_x += v_x*time_delta;
      }
    } else if(double_touch_tf) {
      if(Math.sign(touch_x[0]-w/2) != Math.sign(touch_x[1]-w/2)){
        v_y = jump_v;
        //hit_tf = false;
      }
    }
  }
  me_y += v_y*time_delta;
  //if(hit_tf == false){
  v_y += g*time_delta;
}





function draw(){

  time_delta = (Date.now()-start_time)/1000;
  start_time = Date.now();
  
  background(255);

  value_calc();

  draw_all();

  hit();
  
}



function touchStarted(){
  touch_x = touches.map((k) => {
    return k.x
  });
  touch_y = touches.map((k) => {
    return k.y
  });
  if(touch_num == 1){
    if(Date.now() - double_touch_start <= 100){
      if(Math.sign(touch_x[0]-w/2) != Math.sign(touch_x[1]-w/2)){
        double_touch_tf = true;
      }
    }
  }
  touch_num = touch_x.length;
  if(touch_num == 1){
    double_touch_start = Date.now();
  }
}

function touchEnded(){
  touch_x = touches.map((k) => {
    return k.x
  });
  touch_y = touches.map((k) => {
    return k.y
  });
  touch_num = touch_x.length;
  double_touch_tf = false;
}
