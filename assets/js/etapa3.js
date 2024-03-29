$(document).ready(function () {

  //localStorage.setItem("pagina_etapa3", 1);

  if (localStorage.getItem("pagina_etapa3") === null) {
    localStorage.setItem("pagina_etapa3", 1);
    $("#conteudo").load(`pagina_1_etapa3.html`);
  } else {
    $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa3")}_etapa3.html`);
  }

  // #region Funcionalidade de avançar ou retornar a tela
  $("#btnVoltar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa3")) <= 1) {
      localStorage.setItem("pagina_etapa3", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa3", parseInt(localStorage.getItem("pagina_etapa3")) - 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa3")}_etapa3.html`);
    }
  });

  $("#btnAvancar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa3")) >= 9) {
      localStorage.setItem("pagina_etapa3", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa3", parseInt(localStorage.getItem("pagina_etapa3")) + 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa3")}_etapa3.html`);
    }
  });
  // #endregion
});
