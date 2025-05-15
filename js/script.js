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
        erroLogin.textContent =
          "Email ou nome de usuário e/ou senha incorretos.";
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

  let abrir = document.getElementById("abrirModal");
  let modal = document.getElementById("meuModal");
  let fechar = document.querySelector(".fechar");
  let fotoInput = document.getElementById("fotoInput");
  let fotoPreview = document.getElementById("fotoPreview");
  let nomeUsuarioModal = document.getElementById("nomeUsuarioModal");
  let editarUsuarioForm = document.getElementById("editarUsuarioForm");
  let emailEditar = document.getElementById("emailEditar");
  let senhaEditar = document.getElementById("senhaEditar");

  function carregarDadosUsuario() {
    let usuarioLogadoStr = localStorage.getItem("usuarioLogado");
    if (!usuarioLogadoStr) return;

    let usuarioLogado = JSON.parse(usuarioLogadoStr);

    nomeUsuarioModal.textContent = usuarioLogado.nomeUsuario || "Usuário";
    emailEditar.value = usuarioLogado.email || "";
    senhaEditar.value = usuarioLogado.senha || "";

    // carrega foto q ta no localStorage
    if (usuarioLogado.fotoBase64) {
      fotoPreview.src = usuarioLogado.fotoBase64;
    } else {
      fotoPreview.src = "../imagens/imagem-padrao.webp"; //sem foto carrega essa
    }
  }

  abrir.onclick = function (e) {
    e.preventDefault();
    carregarDadosUsuario();
    modal.style.display = "block";
  };

  fechar.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  fotoInput.addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        fotoPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  editarUsuarioForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let usuarioLogadoStr = localStorage.getItem("usuarioLogado");
    if (!usuarioLogadoStr) return alert("Nenhum usuário logado.");

    let usuarioLogado = JSON.parse(usuarioLogadoStr);
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Atualiza os dados do usuario logado
    usuarioLogado.email = emailEditar.value.trim();
    usuarioLogado.senha = senhaEditar.value;

    // Atualiza foto se mudou
    if (fotoPreview.src && fotoPreview.src.startsWith("data:image")) {
      usuarioLogado.fotoBase64 = fotoPreview.src;
    }

    // Atualiza o array de usuarios no localStorage
    let indexUsuario = usuarios.findIndex(
      (u) => u.nomeUsuario === usuarioLogado.nomeUsuario
    );
    if (indexUsuario !== -1) {
      usuarios[indexUsuario] = usuarioLogado;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      alert("Dados atualizados com sucesso!");
      modal.style.display = "none";
    } else {
      alert("Erro ao atualizar usuário.");
    }
  });

  let explorarBtn = document.querySelector("#grupos .btn");
  let spoilerAtivado = false;

  let comentarioTextarea = document.querySelector("#forumGrupo textarea");
  let enviarComentarioBtn = document.querySelector("#forumGrupo button");
  let listaComentarios = document.querySelector("#comentariosGrupo ul");

  if (explorarBtn) {
    explorarBtn.addEventListener("click", () => {
      document.querySelector("main .hero").style.display = "none";
      document.querySelector("#grupos").style.display = "none";
      document.querySelector("#leitura").style.display = "none";
      document.querySelector("#sobre").style.display = "none";

      document.querySelector("#juliaCasoUso").style.display = "block";
      carregarComentarios();
    });
  }

  // voltar
  window.voltarParaInicio = function () {
    document.querySelector("#juliaCasoUso").style.display = "none";
    document.querySelector("main .hero").style.display = "block";
    document.querySelector("#grupos").style.display = "block";
    document.querySelector("#leitura").style.display = "block";
    document.querySelector("#sobre").style.display = "block";
  };

  // spoiler 
  window.toggleSpoiler = function () {
    let btn = document.getElementById("spoilerToggle");

    spoilerAtivado = !spoilerAtivado;

    if (spoilerAtivado) {
      btn.innerText = "🔓 Spoiler: Ativado";
      alert("Modo spoiler ativado: comentários com spoiler foram ocultados.");
    } else {
      btn.innerText = "🔒 Spoiler: Desativado";
    }

    carregarComentarios();
  };

  // concluir
  window.marcarComoConcluido = function () {
    alert("Capítulo marcado como concluído! 🎉");
  };

  // enviar novo comentário
  enviarComentarioBtn.addEventListener("click", () => {
    let texto = comentarioTextarea.value.trim();
    if (texto === "") return;

    let novoComentario = {
      autor: "Você",
      texto: texto,
    };

    // aalvar no localStorage
    let comentarios = JSON.parse(
      localStorage.getItem("comentariosNeuromancer") || "[]"
    );
    comentarios.push(novoComentario);
    localStorage.setItem("comentariosNeuromancer", JSON.stringify(comentarios));

    comentarioTextarea.value = "";
    carregarComentarios();
  });

  function carregarComentarios() {
    let comentarios = JSON.parse(
      localStorage.getItem("comentariosNeuromancer") || "[]"
    );
    listaComentarios.innerHTML = "";

    if (spoilerAtivado) {
      let aviso = document.createElement("li");
      aviso.textContent =
        "🛑 Comentários ocultos devido ao modo spoiler ativado.";
      aviso.style.fontStyle = "italic";
      aviso.style.color = "gray";
      listaComentarios.appendChild(aviso);
      return;
    }

    comentarios.forEach((com) => {
      let li = document.createElement("li");
      li.innerHTML = `<strong>${com.autor}:</strong> ${com.texto}`;
      listaComentarios.appendChild(li);
    });
  }
});
