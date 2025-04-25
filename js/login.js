document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const erroEl = document.getElementById("loginError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginVal = document.getElementById("loginInput").value.trim();
    const senhaVal = document.getElementById("passwordInput").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) =>
        (u.email === loginVal || u.nomeUsuario === loginVal) &&
        u.senha === senhaVal
    );

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      // redireciona para paginas/index.html
      window.location.href = "index.html";
    } else {
      erroEl.textContent = "Email ou nome de usuário e/ou senha incorretos.";
    }

    console.log("Usuário encontrado:", usuario);
    console.log("Redirecionando para index.html");
  });
});
