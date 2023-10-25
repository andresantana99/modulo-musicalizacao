const zoomMaximo = 180;
const zoomMinimo = 70;

$(document).ready(function () {

  //#region Funcionalidade para habilitar ou desabilitar o modo escuro
  $('#btnAltoContraste').click(alternarModoEscuro);

  function alternarModoEscuro() {
    if ($('html').attr('data-bs-theme') == 'light') {
      $('html').attr('data-bs-theme', 'dark');
      $('#btnDiminuirFonte').css('filter', 'invert(1)');
      $('#btnAumentarFonte').css('filter', 'invert(1)');
      $('#btnAltoContraste').css('filter', 'invert(1)');
      $('#btnAcessibilidade').css('filter', 'invert(1)');
      $('button').addClass('btn-dark');
      $('button').removeClass('btn-light');

    } else {
      $('html').attr('data-bs-theme', 'light');
      $('#btnDiminuirFonte').css('filter', 'invert(0)');
      $('#btnAumentarFonte').css('filter', 'invert(0)');
      $('#btnAltoContraste').css('filter', 'invert(0)');
      $('#btnAcessibilidade').css('filter', 'invert(0)');
      $('button').addClass('btn-light');
      $('button').removeClass('btn-dark');
      
    }
  }
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
