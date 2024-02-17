//alert('hey');


const width = window.innerWidth;
const height = window.innerHeight;

const T_one_base = 0.5;
let T_one = 0.5;

//const left1 = (width-60)/3+30;
const left1 = (width-250)/2
const right1 = width - (width-60)/3-30;

const width_n1 = 10;
const height_n1 = 22;
const r1 = (right1-left1)/(width_n1+2);
const up1 = (height-r1*(height_n1-1))/2;
let state1 = 'None';
let touch2 = {x:[],y:[]};

//block1,floor1左下が基準で端を除いた[縦][横]
let block1 = [];
let floor1 = [];
const all_mino1 = ['T','I','O','L','J','S','Z'];
let now_mino1 = 'S';
let mino_list1 = [];
let dir = 'N';
const fr = 30;
let text1 = '';
let Timer = 0;
let Time_run = false;
let on_time = 0.5;
let srs = {T:[[0,0]],I:[[0,0]],L:[[0,0]],J:[[0,0]],S:[[0,0]],Z:[[0,0]]};
let delete_line_num = 0;
let next_mino_list = [];
let T_one_multi = 20;
let hold = '';
let hold_list = {};
let hold_tf = false;
const next_num = 5;
let fast = [[]];
let wait_put = 15;
let min_mino = 100;
let touch1 = {x:[],y:[]};
let n1 = 0;
let prex1 = 0;
let prey1 = 0;
let now_x = 0;
let move_x = false;
let hold_tf_first = true;
let hard_all_tf = true;
let on_time_base = 0.5;
const side_v = 3.2;



function next_in(){
  let k_list1 = all_mino1.concat();
  for(let k = 7; k > 0; k--){

    mino_list1.push(k_list1.splice(Math.floor(k*Math.random()),1)[0]);
  }
}
next_in();

// Aminoのx,yは左下が基準で[横][縦]
let Amino = {kind:'',dir:'N',list:[[]],x:Math.floor(width_n1/2)-1,y:height_n1-2,color:[0,0,180],prex:0,prey:0,predir:'N'};


let touch_tf = true;


//let touches = [{x:0,y:0}];

//let put_tf1 = false;

for(let k = 0; k < height_n1+5; k++){
  block1.push([]);
  for(let k1 = 0; k1 < width_n1; k1++){
    block1[k].push(0);
  }
}
floor1 = block1.concat();
//floor1[3][4] = [255,0,0];
//floor1[2][3] = [255,0,0];


function setup(){
  createCanvas(width,height);
}

function back(r_k,left_k,up_k,n_width_k,n_height_k){
  fill(150);
  rect(left_k,up_k,r_k*n_width_k,r_k*n_height_k-2*r_k);
  fill(0);
  rect(left_k+r_k,up_k,r_k*(n_width_k-2),r_k*(n_height_k-3));
  for (let k = 1; k < n_width_k; k++){
    stroke(255);
    strokeWeight(2);
    line(left_k+k*r_k,up_k,left_k+k*r_k,up_k+(n_height_k-2)*r_k);
    for (let k1 = 1; k1 < n_height_k-2; k1++){
      line(left_k,up_k+k1*r_k,left_k+n_width_k*r_k,up_k+k1*r_k);
    }
  }
}
function fall_fin(){

  

  
  for (k of Amino.list){
    
    //console.log(k);
    if(k[0]<0 || k[0]>width_n1 || k[1]<=1) return true;
    /*console.log(k)
    console.log(Amino.list.length);*/
    if(floor1[k[1]-2][k[0]] != 0) return true;
  }
  return false;
}







// 現在の実行内容を決定する
//初期位置を設定
function when(){
  //alert(first_tf1);
  //alert('hey')
  //console.log(state1);
  //console.log(state1);
  if(state1 == 'first'){
    //console.log('first')
    //fast = Amino.list;
    /*if(fast == Amino.list && fast == Amino.list){*/
    /*if(Amino.x == Math.floor(width_n1/2)-1 && Amino.y == height_n1-3){
      alert('Finish');
      noLoop();
    }*/
    
    return

  }
  //console.log(state1 == 'first');
  if(state1 == 'None'){
    //console.log('null');
    state1 = 'first';
    min_mino = 100;
    wait_put = 15;
    //console.log(mino_list1[0])
    Amino.x = Math.floor(width_n1/2)-1;
    if(mino_list1[0] == 'I') Amino.x = Math.floor(width_n1/2);
    Amino.y = height_n1-3;
    return
  }
  if(state1 == 'fall'){
    
    // 地面についたか
  
    if(fall_fin()){
      min_mino = 100;
      wait_put = 15;
      put_tf1 = false;
      hold_tf = false;
      state1 = 'first';
      //let last_k = 0;
      fast = Amino.list.concat();
      for(k of Amino.list){
        
        floor1[k[1]-1][k[0]] = Amino.color;
        //floor1 = [[[255,0,0],0],[[255,255,0],0]];
        //console.log('Fin');
        //console.log(floor1[k[1]]);

        //console.log(mino_list1[0])
        Amino.x = Math.floor(width_n1/2)-1;
        if(mino_list1[0] == 'I') Amino.x = Math.floor(width_n1/2);
        Amino.y = height_n1-3;
        
        //if(Amino.kind == 'I') Amino.y = height_n1-3;
        //last_k += 1;
      }
    }
    return
  }
}

// ミノの回転
function rotation_is(kind_k,dir_k,x_k1,y_k1){
  //alert('in');
  let list_k1 = [[]];
  if(kind_k == 'T'){
    //console.log('T')
    list_k1 = [[-1,0],[0,0],[1,0],[0,1]];
  } else if(kind_k == 'I'){
    list_k1 = [[-1,0],[0,0],[1,0],[2,0]];
  } else if(kind_k == 'S'){
    list_k1 = [[-1,0],[0,0],[0,1],[1,1]];
  } else if(kind_k == 'Z'){
    list_k1 = [[-1,1],[0,1],[0,0],[1,0]];
  } else if(kind_k == 'J'){
    list_k1 = [[-1,1],[-1,0],[0,0],[1,0]];
  } else if(kind_k == 'L'){
    list_k1 = [[1,1],[1,0],[0,0],[-1,0]];
  } else if(kind_k == 'O'){
    list_k1 = [[0,1],[1,1],[1,0],[0,0]];
  }
  if(kind_k == 'I'){
    if(dir_k == 'E') list_k1 = [[1,2],[1,1],[1,0],[1,-1]];
    if(dir_k == 'S') list_k1 = [[-1,-1],[0,-1],[1,-1],[2,-1]];
    if(dir_k == 'W') list_k1 = [[0,2],[0,1],[0,0],[0,-1]];
    //return
  } else if(kind_k != 'O'){
    for (let k = 0; k < list_k1.length; k ++){
      if(dir_k == 'E'){
        list_k1[k] = [list_k1[k][1],-list_k1[k][0]]
      } else if(dir_k == 'S'){
        list_k1[k] = [-list_k1[k][0],-list_k1[k][1]]
      } else if (dir_k == 'W'){
        list_k1[k] = [-list_k1[k][1],list_k1[k][0]]
      }
    }
  }

  /*if(Amino.predir == Amino.dir){
    return list_k1;
  }*/
  //text1 = [];


  let x_k0 = 0;
  let y_k0 = 0;
  //alert(list_k1.length);
  
  for(let k = 0; k < list_k1.length; k++){
    //console.log([Amino.x + list_k1[k][0]+x_k,Amino.y + list_k1[k][1]+y_k])
    x_k0 = Amino.x + list_k1[k][0]+x_k1;
    y_k0 = Amino.y + list_k1[k][1]+y_k1-2;
    //y_k0 = 10;
    //text1 = [x_k0,y_k0,floor1[y_k0][x_k0]];
    if(y_k0 > floor1.length-1){
      //text1 = ['q']
      //alert(y_k0);
      //alert('1');
      return [Amino.predir,false];
    }
    if(y_k0 < 0){
      return [Amino.predir,false];
    }

    if(x_k0 < 0 || x_k0 > floor1[y_k0].length-1 || y_k0 > floor1.length-1){
      //alert(y_k0);
      //alert('2');
      return [Amino.predir,false];
    } else if(! floor1[y_k0][x_k0] == 0) {
      //alert(y_k0);
      //alert('3');
      return [Amino.predir,false];
    } else {
      //alert('else');
    }
  }
  
  

  text1 = [true];
  return [dir_k,true];
  
}













//  回転






function srs_calc(kind_srs_k,predir_srs_k,dir_srs_k){
  let list_srs_k = [[]];
  if(kind_srs_k != 'I'){
    if(dir_srs_k == 'E'){
      list_srs_k = [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]];
    } else if(dir_srs_k == 'W'){
      list_srs_k = [[0,0],[1,0],[1,1],[0,-2],[1,-2]];
    } else if(predir_srs_k == 'E'){
      list_srs_k = [[0,0],[1,0],[1,-1],[0,2],[1,2]];
    } else if(predir_srs_k == 'W'){
      list_srs_k = [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]];
    }
    
  } else if(kind_srs_k == 'O'){
    list_srs_k = [[0,0]];
  } else { // Iミノ
    if((predir_srs_k == 'N' && dir_srs_k == 'W') || (predir_srs_k == 'E' && dir_srs_k == 'S')){
      list_srs_k = [[0,0],[-1,0],[2,0],[-1,2],[2,-1]];
    } else if((predir_srs_k == 'E' && dir_srs_k == 'N') || (predir_srs_k == 'S' && dir_srs_k == 'W')){
      list_srs_k = [[0,0],[2,0],[-1,0],[2,1],[-1,-2]];
    } else if(predir_srs_k == 'N' && dir_srs_k == 'E'){
      list_srs_k = [[0,0],[-2,0],[1,0],[-2,-1],[1,2]];
    } else if(predir_srs_k == 'W' && dir_srs_k == 'N'){
      list_srs_k = [[0,0],[-2,0],[1,0],[1,-2],[-2,1]];
    } else if(predir_srs_k == 'W' && dir_srs_k == 'S'){
      list_srs_k = [[0,0],[1,0],[-2,0],[-2,-1],[1,2]];
    } else if(predir_srs_k == 'S' && dir_srs_k == 'E'){
      list_srs_k = [[0,0],[2,0],[-1,0],[2,-2],[-2,1]];
    }
  }
  return list_srs_k;

}



let n_k0 = 0;
// ミノのきばんの情報を作成
function mino_list_get(kind_k,dir_k0){
  
 
  function rotate(dir_k){
    let list_k = [[]];
    if(kind_k == 'T'){
      //console.log('T')
      list_k = [[-1,0],[0,0],[1,0],[0,1]];
    } else if(kind_k == 'I'){
      list_k = [[-2,0],[-1,0],[0,0],[1,0]];
    } else if(kind_k == 'S'){
      list_k = [[-1,0],[0,0],[0,1],[1,1]];
    } else if(kind_k == 'Z'){
      list_k = [[-1,1],[0,1],[0,0],[1,0]];
    } else if(kind_k == 'J'){
      list_k = [[-1,1],[-1,0],[0,0],[1,0]];
    } else if(kind_k == 'L'){
      list_k = [[1,1],[1,0],[0,0],[-1,0]];
    } else if(kind_k == 'O'){
      list_k = [[0,1],[1,1],[1,0],[0,0]];
    }
    if(kind_k == 'I'){
      if(dir_k == 'E') list_k = [[0,2],[0,1],[0,0],[0,-1]];
      if(dir_k == 'S') list_k = [[-2,-1],[-1,-1],[0,-1],[1,-1]];
      if(dir_k == 'W') list_k = [[-1,2],[-1,1],[-1,0],[-1,-1]];
      //return
    } else if(kind_k != 'O'){
      for (let k = 0; k < list_k.length; k ++){
        if(dir_k == 'E'){
          list_k[k] = [list_k[k][1],-list_k[k][0]]
        } else if(dir_k == 'S'){
          list_k[k] = [-list_k[k][0],-list_k[k][1]]
        } else if (dir_k == 'W'){
          list_k[k] = [-list_k[k][1],list_k[k][0]]
        }
      }
    }
    return list_k
  }

  let list_k = [[]];

  //rotate();
  //回転できる場合
  let k_list = [];
  //console.log(srs[kind_k])
  let n_k = 0;
  //alert(dir_k0)

  if(Amino.predir == Amino.dir){
    return rotate(Amino.dir);
  }

  
  

  let srs_k = srs_calc(kind_k,Amino.predir,Amino.dir);
  //let srs_k = srs[kind_k];

  if(kind_k != 'O'){
    for(let k = 0; k < srs_k.length; k++){
      n_k += 1;
      n_k0 += 1;
      //alert('Pre');
      k_list = rotation_is(kind_k,dir_k0,srs_k[k][0],srs_k[k][1]);
      //k_list = rotation_is(kind_k,dir_k0,);
      
      text1 = ['K',n_k0,dir_k0,Amino.predir,k_list]
      
      if(k_list[1] == true){
        Amino.x += srs_k[k][0];
        Amino.y += srs_k[k][1];
        break;
      } else {
        //alert('second')
        continue;
      }
    }
  } else {
    return rotate('N');
  }
  //alert(n_k);
  
  if(k_list[1]){
    //console.log('hey'+"true");
    wait_put -= 1;
    list_k = rotate(k_list[0]);
    time_middle = 0;
  } else {
    
    list_k = rotate(k_list[0]);
    //rotate();
  }
  Amino.predir = dir_k0;
  Amino.dir = k_list[0];
  //console.log(list_k);
  return list_k
}



// ミノを配置
function set_mino(){
  //now_mino1 = 'T';
  if(hold_tf_first){
    Amino.x = Math.floor(width_n1/2)-1;
    if(mino_list1[0] == 'I') Amino.x = Math.floor(width_n1/2);
    Amino.y = height_n1-3;
  }
  Amino.predir = 'N';
  Amino.dir = 'N';
  Amino.kind = now_mino1;
  if(now_mino1 == 'T'){
    Amino.color = [234,104,231];
  } else if(now_mino1 == 'I'){
    Amino.color = [77,230,225];
    //Amino.y = height_n1-2;
  } else if(now_mino1 == 'S'){
    Amino.color = [0,255,0];
  } else if(now_mino1 == 'Z'){
    Amino.color = [255,0,0];
  } else if(now_mino1 == 'O'){
    Amino.color = [255,255,0];
  } else if(now_mino1 == 'J'){
    Amino.color = [0,0,255];
  } else if(now_mino1 == 'L'){
    Amino.color = [255,127,0];
  }
  //Amino.kind = 'T';
  Amino.list_base = mino_list_get(Amino.kind,Amino.dir,Amino.x,Amino.y);
  tf = true;
  //console.log('List')
  //console.log(String(Amino.list_base));
}
let tf = false;


// ミノを描画
function mino_draw(){
  //console.log(Amino.color);
  fill(Amino.color[0],Amino.color[1],Amino.color[2]);
  //fill(200,60,209);
  for(let k = 0; k < Amino.list.length; k++){
    rect(left1+r1+r1*Amino.list[k][0],up1+r1*(height_n1-Amino.list[k][1]-1),r1,r1);
  }
  //console.log(floor1[0][0] == 0);
  for(let k = 0; k < floor1.length; k++){
    //console.log(k)
    for(let k1 = 0; k1 < floor1[k].length; k1++){
      //console.log(floor1[k][k1] == 0);
      if(floor1[k][k1] == 0) continue;
      //console.log('Floor1');
      //console.log(String([k,k1]));
      color_k = floor1[k][k1];
      fill(color_k[0],color_k[1],color_k[2]);
      rect(left1+r1+r1*k1,up1+r1*(height_n1-k-3),r1,r1);
    }
  }
}


function onemino_draw(kind_k2,x_k2,y_k2){
  let dict_k2 = {};
  if(kind_k2 == 'T'){
    dict_k2.color = [234,104,231];
  } else if(kind_k2 == 'I'){
    dict_k2.color = [77,230,225];
    //Amino.y = height_n1-3;
  } else if(kind_k2 == 'S'){
    dict_k2.color = [0,255,0];
  } else if(kind_k2 == 'Z'){
    dict_k2.color = [255,0,0];
  } else if(kind_k2 == 'O'){
    dict_k2.color = [255,255,0];
  } else if(kind_k2 == 'J'){
    dict_k2.color = [0,0,255];
  } else if(kind_k2 == 'L'){
    dict_k2.color = [255,127,0];
  }

  if(kind_k2 == 'T'){
    //console.log('T')
    dict_k2.list_base = [[-1,0],[0,0],[1,0],[0,1]];
  } else if(kind_k2 == 'I'){
    dict_k2.list_base = [[-2,0],[-1,0],[0,0],[1,0]];
  } else if(kind_k2 == 'S'){
    dict_k2.list_base = [[-1,0],[0,0],[0,1],[1,1]];
  } else if(kind_k2 == 'Z'){
    dict_k2.list_base = [[-1,1],[0,1],[0,0],[1,0]];
  } else if(kind_k2 == 'J'){
    dict_k2.list_base = [[-1,1],[-1,0],[0,0],[1,0]];
  } else if(kind_k2 == 'L'){
    dict_k2.list_base= [[1,1],[1,0],[0,0],[-1,0]];
  } else if(kind_k2 == 'O'){
    dict_k2.list_base = [[0,1],[1,1],[1,0],[0,0]];
  }
  
  fill(dict_k2.color[0],dict_k2.color[1],dict_k2.color[2]);
  for(let k = 0; k < dict_k2.list_base.length;k++){
    rect(x_k2+r1*dict_k2.list_base[k][0],y_k2+4*r1-r1*dict_k2.list_base[k][1],r1,r1);
  }
  //console.log(dict_k2);
}

function hold_draw(){
  if(hold == ''){
    return;
  }
  onemino_draw(hold,left1-r1*4,up1);
}


function next_draw(){
  for(let k = 0; k < next_num; k++){
    //console.log('hey');
    onemino_draw(mino_list1[k],left1+r1*(width_n1+3)+r1,up1+r1*4*k);
  }
}


// ミノの動き
function mino_move(){
  //alert(tf)
  if(state1 != 'fall' || tf == false || 'list_base' in Object.keys(Amino)) return;
  //Amino.list = [[,],[,],[,],[,]]
  //alert(Amino.list_base)
  for(let k = 0; k < 4; k++){
    Amino.list[k] = [Amino.list_base[k][0]+Amino.x,Amino.list_base[k][1]+Amino.y].concat();
  }
  
}

function button_draw(){
  fill(255,0,0);
  rect(70,height-170,80,80);
  rect(190,height-170,80,80);
}

let first_tf1 = true;

function delete_line(){
  let line_k = [];
  for(let k = floor1.length-1; k >= 0; k--){
    if(floor1[k].indexOf(0) == -1){
      line_k.push(k);
    }
  }
  let k_empty = [];
  for(let k0 = 0; k0 < width_n1; k0++){
    k_empty.push(0);
  }
  for(k of line_k){
    delete_line_num += 1;
    floor1.splice(k,1)
    floor1.push(k_empty.concat());
  }
}

//time_middleはontimeを使うために用いる
function put_tf(){

  //hold_tf = false;
  let k_tf = false;
  //if(now_mino1 == 'T') time_middle = 0;
  for(k of Amino.list){
    
    //下がブロックの場合
    if(k[1]-3 < 0 || floor1[k[1]-3][k[0]] != 0){
      if(wait_put <= 0) return true;
      k_tf = true;
      if(time_middle == 0 || move_x){
        time_middle = new Date().getTime();
      }
    }
  }
  if(k_tf == false){
    Timer = 0;
    time_middle = 0;
  } else if(new Date().getTime()-time_middle <= 1000*on_time){
    return false;
  }
  on_time = on_time_base;
  return true;
}



let hold_first_tf = false;

function hold_func(){
  put_tf1 = false;
  touch1 = Object.assign({}, touch2);
  if(hold_tf){
    return;
  }
  
  hold_tf = true;
  hold_tf_first = true;

  Amino.x = Math.floor(width_n1/2)-1;
  if(mino_list1[0] == 'I') Amino.x = Math.floor(width_n1/2);
  Amino.y = height_n1-3;
  //alert('hold')

  
  let hold_k = hold;
  if(hold == ''){
    hold_first_tf = true;
    hold = now_mino1;
    //now_mino1 = hold;
  } else {
    hold_first_tf = false;
    hold = now_mino1;
    now_mino1 = hold_k;
  }
  hold_list = Object.assign({}, Amino);
  Amino.x = Math.floor(width_n1/2)-1;
  Amino.y = height_n1-3;
  state1 = 'first';
}

let finish_tf = false;

//終了を判定
function finish_check(){
  /*if(finish_tf){
    Time_run = false;
    return;
  }*/
  if(state1 == 'first'){

    //終了
    if(first_fall_tf){
      //Time_run = false;
      //console.log(finish_tf)
      finish_tf = true;
      
      alert('finish')
      noLoop();
    } else {
      first_fall_tf = true;
    }

  }
  if(state1 == 'fall'){
    first_fall_tf = false;
  }
}

// 終了後の実行
function finish_after_func(){
  if(finish_tf){
    textSize(50);
    fill(255,255,255);
    textAlign(CENTER);
    text('Finish!!\n'+String(delete_line_num),width/2,height/2)
  }
}


let first_fall_tf = false;

function draw(){
  background(20,20,70);
  strokeWeight(3);
  textSize(40);
  fill(255,255,255)
  text(String(delete_line_num),100,120)
  //text(String(wait_put),100,120)

  //text(String(text1), 100, 80);
  
  strokeWeight(2);
  frameRate(fr);

  back(r1,left1,up1,width_n1+2,height_n1+1);
  mino_move();
  when();
  delete_line();
  hold_draw();
  next_draw();
  finish_check();
  if(min_mino > Amino.y){
    min_mino = Amino.y;
    wait_put = 15;

  }
  
  //list_draw();
  

  
  
  //mino_move();
  
  
  if(state1 == 'first'){
    
    //alert(typeof([]));
    //alert(mino_list1.length == 0);
    if(hold_tf == false || hold_first_tf){
      if(next_mino_list.length == 0){
        //alert(mino_list1)
        next_mino_list = [];
        let k_list1 = all_mino1.concat();
        for(let k = 7; k > 0; k--){

          next_mino_list.push(k_list1.splice(Math.floor(k*Math.random()),1)[0]);
        }
        
      }
      mino_list1.push(next_mino_list.shift());
      
      now_mino1 = mino_list1.shift();
    
    }
    set_mino();
    //alert(Amino.y)
    state1 = 'fall';
    
  }

  mino_draw();

  //Time_end = new Date().getTime();
  if(touch2.y[0] - touch1.y[0] >= 120 && hard_all_tf){
    if(new Date().getTime()-touch1.time <= 150){
      let hard_tf = true;
      let hard_y = 0;
      let hard_y_k = 0;

      while(hard_tf){


        for (let k = 0;k < 4; k++){
          if(Amino.list[k][1] - hard_y-2 < 0 || Amino.list[k][1] - hard_y-2 >= floor1.length){
            hard_tf = false;
            if(hard_y_k < hard_y) hard_y_k = hard_y-1;

          } else if(floor1[Amino.list[k][1] - hard_y-2][Amino.list[k][0]] != 0){
            hard_tf = false;
            if(hard_y_k < hard_y) hard_y_k = hard_y-1;


          }


        }
        hard_y += 1;

      }
      Amino.y -= hard_y_k;
      //alert(hard_y_k);
      on_time = 0;

      hard_all_tf = false;
    }


  }

  hold_tf_first = false;
  if(touch2.y[0]-touch1.y[0] >= 70){
    //console.log(touch1.y[0]);
    T_one *= 1/T_one_multi;
  } else if(touch1.y[0]-touch2.y[0] >= 80){
    hold_func();
  }
  if(Timer > fr*T_one && put_tf()){
    Amino.y -= 1;
    Timer = 0;
    Time_middle = 0;
  }
  if(Time_run == true) Timer += 1;
  //button_draw();
  T_one = T_one_base;

  finish_after_func();
}


function touchStarted(){
  Time_run = true;
  touch_tf = true;
  touch1 = {x:touches.map((k)=>k.x),y:touches.map((k)=>k.y),time:new Date().getTime()};
  touch2 = {x:touches.map((k)=>k.x),y:touches.map((k)=>k.y)};
  n1 = 0
  prex1 = Amino.x;
  prey1 = Amino.y;
  //text1 = prex1;
}



function touchMoved(){
  touch_tf = false;
  n1 += 1;

  let k_tf = true;
  now_x = Amino.x;
  
  //text1 = [];
  touch2 = {x:touches.map((k)=>k.x),y:touches.map((k)=>k.y)};




  

  //横移動
  if((touch2.y[0]-touch1.y[0]) != 0){
    if(hard_all_tf && Math.abs((touch2.x[0]-touch1.x[0])/(touch2.y[0]-touch1.y[0])) >= 1){

      
      k_x_base = (
        side_v*width_n1*(
          Math.sign(
            touch2.x[0]-touch1.x[0]
          )*(
            Math.sign(
               Math.abs(
                 Math.abs(
                   touch2.x[0]-touch1.x[0]
                 )-10
               )
            )+1
          )/2*(
            Math.abs(
              Math.abs(
                touch2.x[0]-touch1.x[0])
              -10)
            )
          )/width
        );

      for (let k = 0; k < Amino.list.length; k ++){
        k_x = prex1+Amino.list_base[k][0] + Math.floor(k_x_base);
        k_y = Amino.list[k][1];
        //text1.push(k_x);
        if((-1 >= k_x || k_x >= width_n1)){
          k_tf = false;
          //console.log(1);

        }

        /*if(Math.abs(k_x-Amino.list[k][0])>1){
          k_tf = false;
          console.log(2);

        }*/
        //k_y-2から
        if(floor1.length+1 < k_y || k_y<2){
          k_tf = false;
          //console.log(3);

          continue

        }




        if(floor1[k_y-2][k_x] != 0){
          k_tf = false;
          //console.log(4)

        }

      }
      //console.log(k_tf)
      if(k_tf) Amino.x = prex1 + Math.floor(k_x_base);
      //text1 = 
      move_x = (Amino.x != now_x);
      if(move_x){
        wait_put -= 1;
      }
    }
  }
  
}

end = true;
function touchEnded(){
  hard_all_tf = true;

  touch2 = {x:touches.map((k)=>k.x),y:touches.map((k)=>k.y)};
  if(touch_tf){
    //put_tf1 = true;
    Amino.predir = Amino.dir+'';
    if(touch1.x[0] > width/2){
      if(Amino.dir == 'N'){
        Amino.dir = 'E';
      } else if(Amino.dir == 'E'){
        Amino.dir = 'S';
      } else if(Amino.dir == 'S'){
        Amino.dir = 'W';
      } else if(Amino.dir == 'W'){
        Amino.dir = 'N';
      }
    }
    if(touch1.x[0] < width/2){
      //console.log(Amino.dir == 'W')
      if(Amino.dir == 'N'){
        Amino.dir = 'W';
      } else if(Amino.dir == 'W'){
        Amino.dir = 'S';
      } else if(Amino.dir == 'S'){
        Amino.dir = 'E';
      } else if(Amino.dir == 'E'){
        Amino.dir = 'N';
      }
    }
    //alert('Mino')
    Amino.list_base = mino_list_get(Amino.kind,Amino.dir);
    /*end = false;
    setTimeout(()=>{
      end = true;
    },1000);*/
    

  }
  touch1 = {x:touches.map((k)=>k.x),y:touches.map((k)=>k.y)};
}



/*setInterval(()=>{
  Amino.y -= 1;
},1000*T_one);*/
