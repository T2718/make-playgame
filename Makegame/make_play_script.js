//alert('V:1.00.01');
const w = window.innerWidth;
const h = window.innerHeight;

//let l = [];
//lは[[◯*W]*H]個で入っている

let params = (new URL(window.location.href)).searchParams;

let params_l = params.get('l');

let p_s = [];

let n_h = 15;
let n_w = 30;
let l  = [];
let l0 = [];
for (let k = 0; k < n_w; k++){
  l0.push(0);
}
for (let k = 0; k < n_h; k++){
  l.push(l0.concat())
  
}
//左上基準
let me_x = 2.5;
let me_y = 12.5;



try{
  p_s = params_l.split('-');
  me_x = Number(p_s[0])+0.5;
  me_y = Number(p_s[1])+0.5;
  n_h = Number(p_s[2]);
  n_w = Number(p_s[3]);
  l = [];
  l0 = []
  for (let k = 0; k < n_w; k++){
    l0.push(0);
  }
  for (let k = 0; k < n_h; k++){
    l.push(l0.concat())
  }
  let N_k_k = BigInt(p_s[4]);
  let L_k_k = BigInt(p_s[5]);
  let k_k = L_k_k;
  let N_n_k_k = "";
  while(true){
    N_n_k_k += (k_k%N_k_k).toString();
    k_k = BigInt((k_k-k_k%N_k_k)/2n);
    if(k_k == 0){
      break;
    }
  }
  N_n_k_k = N_n_k_k.split("").reverse().slice(1);
  let k_k0 = 0;
  for(let k_k_h = 0; k_k_h < n_h; k_k_h++){
    for(let k_k_w = 0; k_k_w < n_w; k_k_w++){
      l[k_k_h][k_k_w] = Number(N_n_k_k[k_k0]);
      k_k0 += 1;
    }
  }

} catch(e) {
  alert("Error:"+e);
}



//l = JSON.parse(localStorage.getItem('MakeGame:BlockList'));


n_h = l.length;
n_w = l[0].length;
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
let ground_tf = false;

let margin = 80;


if(n_h/n_w > h/w){
  //hがぴったり
  r = h/n_h;
  left = parseInt((w-r*n_w)/2);
} else {
  //wがぴったり
  r = w/n_w;
}







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
          ground_tf = true;
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
    if(Date.now()-double_touch_start >= margin && double_touch_tf == false){
      if(touch_num >= 2){
        //ジャンプ
        if(Math.sign(touch_x[0]-w/2) != Math.sign(touch_x[1]-w/2)){
          if(ground_tf){
            v_y = jump_v;
            ground_tf = false;
          }
        }
      }
      if(touch_x[0] <= w/2){
        v_x = -v_x_origin;
        me_x += v_x*time_delta;
      } else {
        v_x = v_x_origin;
        me_x += v_x*time_delta;
      }
    //ダブルクリック
    } else if(double_touch_tf) {
      //ジャンプ
      if(Math.sign(touch_x[0]-w/2) != Math.sign(touch_x[1]-w/2)){
        if(ground_tf){
          v_y = jump_v;
          ground_tf = false;
        }
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
    if(Date.now() - double_touch_start <= margin){
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
