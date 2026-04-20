$(document).ready(function () {
  
    $("#btn-EtapaInicial").click(function (e) {
      e.preventDefault();
      window.location.href = "./views/etapa1/index.html";
    });
  
    $("#btn-SelecaoEtapa").click(function (e) {
      e.preventDefault();
      window.location.href = "./views/selecaoEtapa/index.html";
    });

    $("#home").click(function (e) {
      e.preventDefault();
      window.location.href = "index.html";
    });
  });
  