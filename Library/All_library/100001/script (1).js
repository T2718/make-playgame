

window.addEventListener('DOMContentLoaded', () => {
  // 処理

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  let x = null;
  let y = null;
  let Angle_v = 0;
  let Angle_max_v = 0;
  const Angle_a = 0.05;
  const Angle_minus_a = 0.12;
  const Angle_max_v_main = 0.04;
  let touch_num = 0;
  let max_v = 7;
  let max_minus_v = 4;
  let v = 0;
  let a = 4;
  let minus_a = 8;
  let Angle = 0;
  let time = Date.now();
  let delta_time = 0;
  let Cubist_pos = {};
  const l = 10;
  const r_angle_button = 120;
  let Angle_tf = false;
  let Angle_sign = 1;

  let OnRoad_list = [];
  let OnRoad_tf = true;

  // [[[x,z],w,h]]
  //x,zは右下の座標(左側がZ軸の正の方向)
  let Road_list = [[[-250,-900],500,1800],[[-250,900],1900,500],[[1150,-900],500,1800],[[-250,-1400],1900,500]];

  


  //Text
  let txt = "";
  const text = document.getElementById('text');
  function txt_draw(txt_k){
    txt = txt_k
    text.innerHTML = txt;
  }

  //桁指定の四捨五入の関数作成
  function new_round(num_k,digit_k){
    const pow_digit_k = Math.pow(10,digit_k);
    return Math.round(num_k*pow_digit_k)/pow_digit_k;
  }
  

  //Camera
  let camera_x = -400;
  let camera_y = 80;
  let camera_z = -400;


  
  
  //加減速ボタン
  let acc_bra_l = 60;
  let acc_bra_tf = false;
  //加速ボタン
  let acc_butt_x = width-150;
  let acc_butt_y = height-220;
  //減速ボタン
  let bra_butt_x = width-150;
  let bra_butt_y = height-120;

  //方向ボタンの中心
  let angle_button_x = 180;
  let angle_button_y = height-190;

  let isSmartPhone = false;

  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    isSmartPhone = true;
  } else {
    isSmartPhone = false;
  }
  if(isSmartPhone){
    //加減速ボタン
    acc_bra_l = 60;
    acc_bra_tf = false;
    //加速ボタン
    acc_butt_x = width-150;
    acc_butt_y = height-220;
    //減速ボタン
    ra_butt_x = width-150;
    bra_butt_y = height-120;

    //方向ボタンの中心
    angle_button_x = 180;
    angle_button_y = height-190;

    r_angle_button = 120;
  }

  //Banker
  const banker_mult = 3;
  let banker_x_min = null;
  let banker_y_min = null;
  let banker_x_max = null;
  let banker_y_max = null;
  let banker_w = 0;
  let banker_h = 0;
  let banker_margin = 200;

  

  //Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(`window`.devicePixelRatio);

  //scene
  const scene = new THREE.Scene();


  //camera
  const camera = new THREE.PerspectiveCamera(20, width/height)
  camera.position.set(0, camera_y, camera_z);
  camera.lookAt(new THREE.Vector3(0, 0, 0));




  //Cubist
  const Cubist_geometry = new THREE.BoxGeometry(l,l,l);
  const Cubist_material = new THREE.MeshPhongMaterial({color: 0x0000ff});
  const Cubist = new THREE.Mesh(Cubist_geometry, Cubist_material);
  Cubist.position.set(0, 0, 0);
  Cubist.rotation.y = 0;
  scene.add(Cubist);


  //Road_listを描画
  function Road_Make(x_k,z_k,w_k,h_k){
    var Road_geometry_k = new THREE.PlaneGeometry(w_k,h_k);
    var Road_material_k = new THREE.MeshBasicMaterial({color: 0x228b22});
    var Road_k = new THREE.Mesh(Road_geometry_k, Road_material_k);
    Road_k.position.set(x_k+w_k/2,-l/2,z_k+h_k/2);
    Road_k.rotation.x = -Math.PI/2;
    scene.add(Road_k);
  }

  for(let k = 0; k < Road_list.length; k++){
    let R_k = Road_list[k];
    Road_Make(R_k[0][0],R_k[0][1],R_k[1],R_k[2]);
    if(banker_x_min == null){
      banker_x_min = R_k[0][0]-banker_margin;
      banker_y_min = R_k[0][1]-banker_margin;
      banker_x_max = R_k[0][0]+R_k[1]+banker_margin;
      banker_y_max = R_k[0][1]+R_k[2]+banker_margin;
    } else {
      if(banker_x_min > R_k[0][0]-banker_margin) banker_x_min = R_k[0][0]-banker_margin;
      if(banker_y_min > R_k[0][1]-banker_margin) banker_y_min = R_k[0][1]-banker_margin;
      if(banker_x_max < R_k[0][0]+R_k[1]+banker_margin) banker_x_max = R_k[0][0]+R_k[1]+banker_margin;
      if(banker_y_max < R_k[0][1]+R_k[2]+banker_margin) banker_y_max = R_k[0][1]+R_k[2]+banker_margin;
    }
  }
  banker_w = banker_x_max-banker_x_min+banker_margin*2;
  banker_h = banker_y_max-banker_y_min+banker_margin*2;
  
  //Plane
  /*var Plane_geometry = new THREE.PlaneGeometry(100,1000);
  var Plane_material = new THREE.MeshBasicMaterial({color: 0x228b22});
  var Plane = new THREE.Mesh(Plane_geometry, Plane_material);
  Plane.position.set(0,-l/2,0);
  Plane.rotation.x = -Math.PI/2;
  scene.add(Plane);*/

  //Banker
  var Banker_geometry = new THREE.PlaneGeometry(banker_w,banker_h);
  var Banker_material = new THREE.MeshBasicMaterial({color:0xdeb887});
  var Banker = new THREE.Mesh(Banker_geometry, Banker_material);
  Banker.rotation.x = -Math.PI/2;
  Banker.position.set((banker_x_min+banker_x_max)/2,-l/2-0.5,(banker_y_min+banker_y_max)/2);
  scene.add(Banker);

  
  
  const light = new THREE.AmbientLight(0xffffff,1);

  scene.add(light);




  //Touchイベント
  try{
    window.addEventListener('touchstart',(event_k)=>{
      x = [];
      y = [];
      touch_num = event_k.touches.length;
      for(let k = 0; k < touch_num; k++){
        x.push(event_k.touches[k].clientX);
        y.push(event_k.touches[k].clientY);
      }
    });
    window.addEventListener('touchmove',(event_k)=>{
      x = [];
      y = [];
      touch_num = event_k.touches.length;
      for(let k = 0; k < touch_num; k++){
        x.push(event_k.touches[k].clientX);
        y.push(event_k.touches[k].clientY);
      }
      //console.log(x,y)
    });
    window.addEventListener('touchend',(event_k)=>{
      touch_num = event_k.touches.length;
      if(touch_num >= 1){
        x = [];
        y = [];
        for(let k = 0; k < touch_num; k++){
          x.push(event_k.touches[k].clientX);
          y.push(event_k.touches[k].clientY);
        }
      } else {
        x = null;
        y = null;
      }
      
    });
  } catch(error_k){
    alert(error_k);
  }



  
  function tick() {
    requestAnimationFrame(tick);

    // アニメーション処理をここに書く
    //Cubist.rotation.y += 0.01;

    //Cubist_posの設定
    Cubist_pos = Cubist.position;

    
    
    delta_time = (Date.now()-time)/1000;
    time = Date.now();

    //道に乗っているか
    OnRoad_list = [];
    OnRoad_tf = false;
    for (let k = 0; k < Road_list.length; k++){
      let R_k = Road_list[k];
      let OnR_k = false;
      OnR_k = (Cubist_pos.x < R_k[0][0]+R_k[1] && Cubist_pos.x > R_k[0][0] && Cubist_pos.z < R_k[0][1]+R_k[2] && Cubist_pos.z > R_k[0][1]);
      if(OnR_k){
        OnRoad_tf = true;
      }
      OnRoad_list.push(OnR_k);
    }
    console.log(OnRoad_tf);

    
    if(x != null && y != null){


      

      
  

      //加速
      if(acc_butt_x - acc_bra_l < x[0] && x[0] < acc_butt_x && acc_butt_y - acc_bra_l < y[0] && y[0] < acc_butt_y){
        v += a*delta_time;
        if(v > max_v) v = max_v;
        acc_bra_tf = true;
      } else if(touch_num >= 2) {
        if(acc_butt_x - acc_bra_l < x[1] && x[1] < acc_butt_x && acc_butt_y - acc_bra_l < y[1] && y[1] < acc_butt_y){
          v += a*delta_time;
          if(v > max_v) v = max_v;
          acc_bra_tf = true;
        }
      }

      //減速
      if(bra_butt_x - acc_bra_l < x[0] && x[0] < bra_butt_x && bra_butt_y - acc_bra_l < y[0] && y[0] < bra_butt_y){
        v -= a*delta_time;
        if(v < -max_minus_v) v = -max_minus_v;
        acc_bra_tf = true;
      } else if(touch_num >= 2) {
        if(bra_butt_x - acc_bra_l < x[1] && x[1] < bra_butt_x && bra_butt_y - acc_bra_l < y[1] && y[1] < bra_butt_y){
          v -= a*delta_time;
          if(v < -max_minus_v) v = -max_minus_v;
          acc_bra_tf = true;
        }
      }
      //Angleを変更
      //方向ボタンから半径r_angle_button以内の時実行

      if(Math.abs(v) > 0 || acc_bra_tf){
        
        if(touch_num >= 1 && (Math.pow(x[0]-angle_button_x,2)+Math.pow(y[0]-angle_button_y,2)) < r_angle_button*r_angle_button){
          Angle_sign = Math.sign(angle_button_x-x[0]);
          Angle_max_v = Math.abs(Angle_max_v_main*(angle_button_x-x[0])/r_angle_button);
          Angle_tf = true;
        } else if(touch_num >= 2){
          if((Math.pow(x[1]-angle_button_x,2)+Math.pow(y[1]-angle_button_y,2)) < r_angle_button*r_angle_button){
            Angle_sign = Math.sign(angle_button_x-x[1]);
            Angle_max_v = Math.abs(Angle_max_v_main*(angle_button_x-x[1])/r_angle_button);
            Angle_tf = true;
          }

        }
      }

      
    }


    //速度を実際に変える
    if(acc_bra_tf == false){
      if(Math.sign(v - Math.sign(v)*a*delta_time) != Math.sign(v)){
        v = 0;
      } else {
        v = v - Math.sign(v)*minus_a*delta_time;
      }
    }
    acc_bra_tf = false;

    if(OnRoad_tf){
      Cubist.position.z += v*Math.cos(Angle);
      Cubist.position.x += v*Math.sin(Angle);
    } else {
      Cubist.position.z += v*Math.cos(Angle)/banker_mult;
      Cubist.position.x += v*Math.sin(Angle)/banker_mult;
    }

    //方向を実際に変える
    /*if(v >= 0){
      Angle_v = Angle_v*v/max_v;
    } else {
      Angle_v = Angle_v*v/max_minus_v/banker_mult;
    }
    //if(OnRoad_tf == false) Angle_v = Angle_v/banker_mult;
    if(Angle_tf == false){
      if(Math.sign(Angle_v - Math.sign(Angle_v)*Angle_minus_a*delta_time) != Math.sign(Angle_v)){
        Angle_v = 0;
      } else {
        Angle_v = Angle_v - Math.sign(Angle_v)*Angle_minus_a*delta_time;
      }
    } else {
      Angle_v = Angle_v + Angle_sign*Angle_a*delta_time;
      if(Angle_v > Angle_max_v){
        Angle_v = Angle_max_v;
      } else if(Angle_v < -Angle_max_v){
        Angle_v = -Angle_max_v;
      }
    }
    Angle_tf = false;
    
    if(v != 0) {
      Cubist.rotation.y += Angle_v;
    } else {
      Cubist.rotation.y += Angle_v/banker_mult;
    }
    Angle = Cubist.rotation.y;*/
    Angle = Cubist.rotation.y;
    //Angle_v += Angle_sign*Angle_a*delta_time;
    if(Angle_tf == false){
      if(Math.sign(Angle_v - Math.sign(Angle_v)*Angle_minus_a*delta_time) != Math.sign(Angle_v)){
        Angle_v = 0;
      } else {
        Angle_v = Angle_v - Math.sign(Angle_v)*Angle_minus_a*delta_time;
      }
    } else {
      if(OnRoad_tf){
        Angle_v = Angle_v + Angle_sign*Angle_a*delta_time*v/max_v;
      } else {
        Angle_v = Angle_v + Angle_sign*Angle_a*delta_time*v/max_v/banker_mult;
      }
      if(Angle_v > Angle_max_v){
        Angle_v = Angle_max_v;
      } else if(Angle_v < -Angle_max_v){
        Angle_v = -Angle_max_v;
      }
    }
    Angle_tf = false;
    /*if(OnRoad) {
      Cubist.rotation.y += Angle_v;
    } else {
      Cubist.rotation.y += Angle_v/banker_mult;
    }*/
    Cubist.rotation.y += Angle_v;
    


    


    //画面サイズが変更された時
    if(window.innerHeight != height || window.innerWidth != width) {
      alert('Resize')
      width = window.innerWidth;
      height = window.innerHeight;
    }

    //座標をText表示(41行目参照のこと)
    txt_draw('('+String(new_round(Cubist_pos.x,3))+','+String(new_round(Cubist_pos.z,3))+')');
    

    
    camera.position.set(Cubist_pos.x+camera_x*Math.sin(Angle),Cubist_pos.y+camera_y,Cubist_pos.z+camera_z*Math.cos(Angle))
    camera.lookAt(new THREE.Vector3(Cubist_pos.x,20+Cubist_pos.y,Cubist_pos.z));
    //camera.lookAt(new HTMLHRElement.Vector3())
    
    renderer.render(scene, camera); // レンダリング
  }
  tick();
});