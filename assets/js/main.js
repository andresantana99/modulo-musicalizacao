$(document).ready(function () {
  //$("#conteudo").load("views/shared/mainpage.html");
  let ambiente;

  if (
    window.location.host == "127.0.0.1:5500" ||
    window.location.host == "localhost"
  ) {
    ambiente = "dev";
  } else if (window.location.host == "andresantana99.github.io") {
    ambiente = "prd";
  }

  if (window.localStorage) {
    // Suporte ao localStorage
    console.log(window.location.href);
    console.log(window.location.protocol);
    console.log(window.location.host);
    console.log(window.location.pathname);
  }

  //let key = "item 1";
  // localStorage.setItem(key, "value");

  //let myItem = localStorage.getItem(key);

  //localStorage.removeItem(key);
  // localStorage.clear();

  //console.log(myItem);

  // Criar item:
  //let myObj = { name: "Gabriel", age: 25 };
  //localStorage.setItem(key, JSON.stringify(myObj));

  // Ler item:
  //let myItem = JSON.parse(localStorage.getItem(key));

  // for (let i = 0; i < localStorage.length; i++){
  //   let key = localStorage.key(i);
  //   let value = localStorage.getItem(key);
  //   console.log(key, value);
  // }
});
