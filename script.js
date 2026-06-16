// Troca das sessões e Divs

const botoes = document.querySelectorAll(".botaoaside");
const secoes = document.querySelectorAll("section");

botoes.forEach((botao, index) => {

    botao.addEventListener("click", () => {

        secoes.forEach(secao => {
            secao.classList.remove("ativo");
        });

        botoes.forEach(btn => {
            btn.classList.remove("ativo");
        });

        secoes[index].classList.add("ativo");
        botao.classList.add("ativo");

    });

});

//lógica para buscar os dados de cada sessão

const tipo = document
    .querySelector("section.ativo")
    .dataset.tipo;

console.log(tipo);

if (tipo === "funcionarios") {
    buscarFuncionarios();
}

if (tipo === "departamentos") {
    buscarDepartamentos();
}

if (tipo === "filiais") {
    buscarFiliais();
}

if (tipo === "diretoria") {
    buscarDiretoria();
}

if (tipo === "gerencia") {
    buscarGerencia();
}

const api = await fetch("http://localhost:8080/api/funcionarios");
const funcionarios = await api.json();