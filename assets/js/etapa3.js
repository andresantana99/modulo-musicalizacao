$(document).ready(function () {
  $("#home").click(function (e) {
    e.preventDefault();
    Swal.fire({
      title: "Você deseja ir para a Tela Inicial?",
      text: "O seu progresso nessa etapa será perdido!",
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
});
