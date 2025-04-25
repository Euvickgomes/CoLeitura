// Criando um usuário de teste, caso não exista
(function criarUsuarioTeste() {
  const usuarioTeste = {
    nomeUsuario: "sofia",
    email: "sofia@teste.com",
    senha: "123",
  };

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!usuarios.some((u) => u.email === usuarioTeste.email)) {
    usuarios.push(usuarioTeste);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Usuário de teste criado!");
  } else {
    console.log("Usuário de teste já existe.");
  }
})();
