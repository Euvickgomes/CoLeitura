document.addEventListener("DOMContentLoaded", () => {
    //auth.js
    let usuarioLogado = localStorage.getItem("usuarioLogado");
    let logoutBtn = document.getElementById("logoutBtn");
  
    if (logoutBtn && usuarioLogado) {
      logoutBtn.style.display = "inline-block";
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.reload();
      });
    }
  
    //login.js
    let loginForm = document.getElementById("loginForm");
    let erroLogin = document.getElementById("loginError");
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let loginVal = document.getElementById("loginInput").value.trim();
        let senhaVal = document.getElementById("passwordInput").value;
  
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let usuario = usuarios.find(
          (u) =>
            (u.email === loginVal || u.nomeUsuario === loginVal) &&
            u.senha === senhaVal
        );
  
        if (usuario) {
          localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
          window.location.href = "index.html";
        } else {
          erroLogin.textContent = "Email ou nome de usuário e/ou senha incorretos.";
        }
  
        console.log("Usuário encontrado:", usuario);
        console.log("Redirecionando para index.html");
      });
    }
  
    //usuarios.js
    let usuarioTeste = {
      nomeUsuario: "sofia",
      email: "sofia@teste.com",
      senha: "123",
    };
  
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (!usuarios.some((u) => u.email === usuarioTeste.email)) {
      usuarios.push(usuarioTeste);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log("Usuário de teste criado!");
    } else {
      console.log("Usuário de teste já existe.");
    }
  
    //cadastro novos usuarios
    let cadastroForm = document.getElementById("cadastroForm");
    let erroCadastro = document.getElementById("cadastroError");
    let sucessoCadastro = document.getElementById("cadastroSucesso");
  
    if (cadastroForm) {
      cadastroForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        let nomeUsuario = document.getElementById("cadastroUsuario").value.trim();
        let email = document.getElementById("cadastroEmail").value.trim();
        let senha = document.getElementById("cadastroSenha").value;
  
        if (!nomeUsuario || !email || !senha) {
          erroCadastro.textContent = "Todos os campos são obrigatórios.";
          sucessoCadastro.textContent = "";
          return;
        }
  
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
        let existe = usuarios.some(
          (u) => u.email === email || u.nomeUsuario === nomeUsuario
        );
  
        if (existe) {
          erroCadastro.textContent = "Email ou nome de usuário já cadastrado.";
          sucessoCadastro.textContent = "";
          return;
        }
  
        let novoUsuario = { nomeUsuario, email, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
        erroCadastro.textContent = "";
        sucessoCadastro.textContent = "Usuário cadastrado com sucesso!";
        cadastroForm.reset();
  
        console.log("Novo usuário cadastrado:", novoUsuario);
      });
    }
  });