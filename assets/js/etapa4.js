$(document).ready(function () {

  //localStorage.setItem("pagina_etapa3", 1);

  if (localStorage.getItem("pagina_etapa4") === null) {
    localStorage.setItem("pagina_etapa4", 1);
    $("#conteudo").load(`pagina_1_etapa4.html`);
  } else {
    $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa4")}_etapa4.html`);
  }

  // #region Funcionalidade de avançar ou retornar a tela
  $("#btnVoltar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa4")) <= 1) {
      localStorage.setItem("pagina_etapa4", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa4", parseInt(localStorage.getItem("pagina_etapa4")) - 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa4")}_etapa4.html`);
    }
  });

  $("#btnAvancar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa4")) >= 4) {
      localStorage.setItem("pagina_etapa4", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa4", parseInt(localStorage.getItem("pagina_etapa4")) + 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa4")}_etapa4.html`);
    }
  });
  // #endregion
});
