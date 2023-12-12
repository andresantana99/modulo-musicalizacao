$(document).ready(function () {

  // Modal de confirmação para retorno à tela principal
  $("#home").click(function (e) {
    e.preventDefault();
    Swal.fire({
      title: "Você deseja ir para a Tela Inicial?",
      text: "O seu progresso nessa etapa poderá ser perdido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../../index.html";
      }
    });
  });

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
    console.log(localStorage.getItem("pagina_etapa3"));
    e.preventDefault();
    if (parseInt(localStorage.getItem("pagina_etapa3")) >= 8) {
      localStorage.setItem("pagina_etapa3", 1);
      window.location.href = "../../views/selecaoEtapa/index.html";
    } else {
      localStorage.setItem("pagina_etapa3", parseInt(localStorage.getItem("pagina_etapa3")) + 1);
      $("#conteudo").load(`pagina_${localStorage.getItem("pagina_etapa3")}_etapa3.html`);
    }
  });
  // #endregion
});
