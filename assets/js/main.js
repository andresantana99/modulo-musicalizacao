const zoomMaximo = 180;
const zoomMinimo = 70;

$(document).ready(function () {

  //#region Funcionalidade para habilitar ou desabilitar o modo escuro
  if (localStorage.getItem('dark-mode') === null) {
    localStorage.setItem('dark-mode', 'light');
  } 

  alternarModoEscuro();

  $('#btnAltoContraste').click( () => {
    if (localStorage.getItem('dark-mode') == 'light') {
      localStorage.setItem('dark-mode', 'dark');  // Salvando em Cache
    } else {
      localStorage.setItem('dark-mode', 'light');
    }

    alternarModoEscuro();
  });

  function alternarModoEscuro() {
    if (localStorage.getItem('dark-mode') == 'light') {
      $('html').attr('data-bs-theme', 'light');
      $('#btnDiminuirFonte').css('filter', 'invert(0)');
      $('#btnAumentarFonte').css('filter', 'invert(0)');
      $('#btnAltoContraste').css('filter', 'invert(0)');
      $('#btnAcessibilidade').css('filter', 'invert(0)');
      $('button').addClass('btn-light');
      $('button').removeClass('btn-dark');

    } else {
      $('html').attr('data-bs-theme', 'dark');
      $('#btnDiminuirFonte').css('filter', 'invert(1)');
      $('#btnAumentarFonte').css('filter', 'invert(1)');
      $('#btnAltoContraste').css('filter', 'invert(1)');
      $('#btnAcessibilidade').css('filter', 'invert(1)');
      $('button').addClass('btn-dark');
      $('button').removeClass('btn-light');

    }
  }
  //#endregion

  //#region Funcionalidade para aumentar ou diminuir o Zoom 
  
  // Variável para obter aproximadamente os pixels disponíveis na tela do dispositivo
  
  let nivelZoom = Math.round(window.devicePixelRatio * 100);

  if (localStorage.getItem('zoom') !== null) {
    document.body.style.zoom = localStorage.getItem('zoom') + "%";
    
    nivelZoom = parseInt(localStorage.getItem('zoom'));
  }

  // Adicionando evento de click aos respectivos botões
  $('#btnAumentarFonte').click(function (e) {
    e.preventDefault();
    aumentarZoom();
  });

  $('#btnDiminuirFonte').click(function (e) {
    e.preventDefault();
    DiminuirZoom();
  });

  function aumentarZoom() {
    // Não fazer nada ao chegar no zoom máximo possível
    if (nivelZoom >= zoomMaximo) return;

    nivelZoom += 10;
    localStorage.setItem('zoom', nivelZoom);

    // Setar valor de zoom no body
    $('body').css('zoom', nivelZoom.toString() + '%');
  }

  function DiminuirZoom() {
    // Não fazer nada ao chegar no zoom mínimo possível
    if (nivelZoom <= zoomMinimo) return;

    nivelZoom -= 10;
    localStorage.setItem('zoom', nivelZoom);
    
    // Setar valor de zoom no body
    $('body').css('zoom', nivelZoom.toString() + '%');
  }
  //#endregion

});
