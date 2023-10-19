const zoomMaximo = 180;
const zoomMinimo = 70;

$(document).ready(function () {
  //#region Funcionalidade para habilitar ou desabilitar o modo escuro

  //$('body').addClass('dark-mode');
  //$('footer').addClass('dark-mode');

  //#endregion

  //#region Funcionalidade para aumentar ou diminuir o Zoom 

  // Adicionando evento de click aos respectivos botões
  $("#btnAumentarFonte").click(aumentarZoom);
  $("#btnDiminuirFonte").click(DiminuirZoom);

  // Variável para obter aproximadamente os pixels disponíveis na tela do dispositivo
  let nivelZoom = Math.round(window.devicePixelRatio * 100);

  function aumentarZoom() {
    // Não fazer nada ao chegar no zoom máximo possível
    if (nivelZoom >= zoomMaximo) return;

    nivelZoom += 10;

    // Setar valor de zoom no body
    $('body').css('zoom', nivelZoom.toString() + '%');
  }

  function DiminuirZoom() {
    // Não fazer nada ao chegar no zoom mínimo possível
    if (nivelZoom <= zoomMinimo) return;

    nivelZoom -= 10;

    // Setar valor de zoom no body
    $('body').css('zoom', nivelZoom.toString() + '%');
  }
  //#endregion

});
