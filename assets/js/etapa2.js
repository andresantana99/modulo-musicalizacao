$(document).ready(function () {

  //localStorage.setItem("pagina_etapa3", 1);

  if (localStorage.getItem("pagina_etapa2") === null) {
    localStorage.setItem("pagina_etapa2", 1);
    $("#conteudo").load(`pagina_1_etapa2.html`);
  } else {
    $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa2")}_etapa2.html`);
  }

  // #region Funcionalidade de avançar ou retornar a tela
  $("#btnVoltar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa2")) <= 1) {
      localStorage.setItem("pagina_etapa2", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa2", parseInt(localStorage.getItem("pagina_etapa2")) - 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa2")}_etapa2.html`);
    }
    HideAndShowSelecao();
  });

  $("#btnAvancar").click((e) => {
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa2")) >= 15) {
      localStorage.setItem("pagina_etapa2", 1);
      window.location.href = "../../views/etapa3/index.html";
    } else {
      localStorage.setItem("pagina_etapa2", parseInt(localStorage.getItem("pagina_etapa2")) + 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa2")}_etapa2.html`);
    }
    HideAndShowSelecao();
  });
  // #endregion

  $("#btnSelecaoEtapa").click((e) => {
    e.preventDefault();
    localStorage.setItem("pagina_etapa2", 1);
    window.location.href = "../../views/selecaoEtapa/index.html";
  })

  // #region Funcionalidade de ocultar ou exibir botão seleção de etapa
  function HideAndShowSelecao() {
    console.log(parseInt(localStorage.getItem("pagina_etapa2")));
    if (parseInt(localStorage.getItem("pagina_etapa2")) == 15) {
      $("#btnSelecaoEtapa").show();
    } else {
      $("#btnSelecaoEtapa").hide();
    }
  }
  // #endregion
});
