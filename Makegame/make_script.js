//var txt = "";

function post(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function get_text(){
  var txt = "";
  //alert('get');
  txt = document.getElementById("code_txt").value;
  alert(txt);
  post("https://7407c519-8267-4970-933f-2eac052a65ad-00-28itlomxnhxxx.pike.replit.dev/db_post",{"keys":"name,code","name":localStorage
}

function main(){
  alert('hey');
  setTimeout(()=>{
    alert('3秒');
  },3000);
}

window.onload = function() {
  main()
}
