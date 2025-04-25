// auth.js - verificação de login global
document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn && usuarioLogado) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.reload();
    });
  }
});
