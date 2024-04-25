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

let jump_v = -5;
let g = 8;

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


let valueset = document.getElementById('valueset');
valueset.onclick = () => {
  let g_k = prompt("重力加速度(通常10)","");
  if(g_k != null) g = Math.abs(Number(g_k));
  let jump_k = prompt("ジャンプ速度(通常8)","");
  if(jump_k != null) jump_v = -Math.abs(Number(jump_k));
  let wh_k = prompt("自分の座標(左上から数えて何マス目か(四角の左上基準))\n2,6  のように入力してください。(通常3,10)","");
  if(wh_k != null){
    try{
      wh_k = wh_k.split(',');
      me_x = Number(wh_k[0])+0.5;
      me_y = Number(wh_k[1])+0.5;
    } catch {
      alert("Error:  2,6   のように入力してください。")
    }
  }
  
}

try{
  p_s = localStorage.getItem('MakeGame:BlockList');
  //alert(p_s)
  let p_s_tf = false;
  if(p_s != null && (p_s.match(/-/g) || []).length == 7){
    p_s_tf = confirm('以前のデータが残っていますが復元しますか？')
  }
  if(p_s_tf){
    p_s = p_s.split('-');
    g = Number(p_s[0]);
    jump_v = -Number(p_s[1]);
    me_x = Number(p_s[2])+0.5;
    me_y = Number(p_s[3])+0.5;
    n_h = Number(p_s[4]);
    n_w = Number(p_s[5]);
    l = [];
    l0 = [];
    for (let k = 0; k < n_w; k++){
      l0.push(0);
    }
    for (let k = 0; k < n_h; k++){
      l.push(l0.concat())
    }
    let N_k_k = BigInt(p_s[6]);
    let L_k_k = BigInt(p_s[7]);
    //alert([g,jump_v,me_x,me_y,n_h,n_w,N_k_k,L_k_k]);
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
  }
  //alert(l)
} catch(e) {
  alert(e)
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
    
    let l_k = '1'+l.join('').replaceAll(',','');
    l_k = BigInt("0b"+l_k).toString();
    let l_k0 = ""
    try{
      l_k0 = [g,-jump_v,me_x-0.5,me_y-0.5,n_h,n_w,2].join('-')
    } catch(e) {
      alert("ParseError:"+e)
    }
    l_k = l_k0+"-"+l_k;
    //alert(l_k);
    //alert();
    localStorage.setItem('MakeGame:BlockList',l_k);
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
