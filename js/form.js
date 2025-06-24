

//formulário
let form = document.getElementById("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nomeGrupo = document.getElementById('nomeGrupo').value;
    let nomeLivro = document.getElementById('nomeLivro').value;
    let descricao = document.getElementById('descricao').value;
    let genero = document.getElementById('genero').value;
    let linkPdf = document.getElementById('linkPdf').value;

    // Atualiza o conteúdo dos elementos já existentes
    let titulo = document.querySelector('#juliaCasoUso h3');
    titulo.innerText = `Grupo: ${nomeGrupo}`;

    let livro = document.querySelector('#pdfLivro h4');
    livro.innerText = `Livro: ${nomeLivro} (PDF)`;


    let iframe = document.getElementById('iframePDF');
    iframe.src = linkPdf;

    let gen = document.querySelector('#generoLivro h4');
    gen.innerText = `Gênero: ${genero}`;

    let desc = document.querySelector('#descricaoLivro h4');
    desc.innerText = `Descrição: ${descricao}`;
});


form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nomeGrupo = document.getElementById('nomeGrupo').value;
    let nomeLivro = document.getElementById('nomeLivro').value;
    let descricao = document.getElementById('descricao').value;
    let genero = document.getElementById('genero').value;
    let linkPdf = document.getElementById('linkPdf').value;
    let visibilidade = document.getElementById('visibilidade').value;

    // Salvar no localStorage
   const dadosGrupo = {
    nomeGrupo,
    nomeLivro,
    descricao,
    genero,
    visibilidade,
    linkPdf
};

localStorage.setItem("grupoDados", JSON.stringify(dadosGrupo));
window.location.href = "grupo.html";
});



