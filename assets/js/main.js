$(document).ready(function () {
  console.log("teste");
  $("#btn-botao").click(function (e) {
    e.preventDefault();
    console.log(x);
  });

  var toggle = document.getElementById("toggle");
  var exemplo = document.getElementById("exemplo");

  toggle.onclick = function () {
    if (exemplo.className == "hide") {
      exemplo.className = "";
    } else {
      exemplo.className = "hide";
    }
  };
});
