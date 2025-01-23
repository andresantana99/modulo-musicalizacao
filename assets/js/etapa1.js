$(document).ready(function () {

  //localStorage.setItem("pagina_etapa3", 1);

  if (localStorage.getItem("pagina_etapa1") === null) {
    localStorage.setItem("pagina_etapa1", 1);
    $("#conteudo").load(`pagina_1_etapa1.html`);
  } else {
    $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa1")}_etapa1.html`);
  }

  // #region Funcionalidade de avançar ou retornar a tela
  $("#btnVoltar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa1")) <= 1) {
      localStorage.setItem("pagina_etapa1", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa1", parseInt(localStorage.getItem("pagina_etapa1")) - 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa1")}_etapa1.html`);
    }
  });

  $("#btnAvancar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa1")) >= 7) {
      localStorage.setItem("pagina_etapa1", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa1", parseInt(localStorage.getItem("pagina_etapa1")) + 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa1")}_etapa1.html`);
    }
  });
  // #endregion
});
