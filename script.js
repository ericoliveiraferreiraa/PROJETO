// Elementos

const nome = document.getElementById("nome");
const genero = document.getElementById("genero");
const cargo = document.getElementById("cargo");
const departamento = document.getElementById("departamento");
const email = document.getElementById("email");

const img = document.getElementById("img");
const index = document.getElementById("index");

const botaoAnterior = document.getElementById("voltar");
const botaoProximo = document.getElementById("avancar");
const inputBusca = document.querySelector(".buscarempregado input");

// Índice

let funcionarios = [];
let indiceAtual = 0;

// API DE FOTOS

async function buscarFoto(genero) {
    try {

        const response = await fetch(
            `https://randomuser.me/api/?gender=${genero}`   // lógica para buscar foto de acordo com o gênero do funcionário
        );

        const data = await response.json();

        return data.results[0].picture.large;

    } catch (erro) {

        console.error("Erro ao buscar foto:", erro);

        return "";
    }
}

// API de FUNCIONÁRIOS

async function carregarFuncionarios() {

    try {

        const response = await fetch(
            "https://dummyjson.com/users"
        );

        const data = await response.json();

        funcionarios = data.users;   // < retorna o primeiro array do JSON que é o "users"

        mostrarFuncionario(indiceAtual);

    } catch (erro) {

        console.error("Erro ao carregar funcionários:", erro);

    }
}

// Lógica em conjunto

async function mostrarFuncionario(indice) {

    const funcionario = funcionarios[indice];

    if (!funcionario) return;

    const foto = await buscarFoto(funcionario.gender);

    nome.innerText =
        `${funcionario.firstName} ${funcionario.lastName}`;

    genero.innerText =
        `Gênero: ${funcionario.gender}`;

    cargo.innerText =
        `Cargo: ${funcionario.company.title}`;

    departamento.innerText =
        `Departamento: ${funcionario.company.department}`;

    email.innerText =
        `Email: ${funcionario.email}`;

    img.src = foto;

    index.innerText =
        `${indice + 1}`;
}

// Botão avançar

botaoProximo.addEventListener("click", () => {

    if (indiceAtual < funcionarios.length - 1) {

        indiceAtual++;

        mostrarFuncionario(indiceAtual);

    }

});

// Botão voltar

botaoAnterior.addEventListener("click", () => {

    if (indiceAtual > 0) {

        indiceAtual--;

        mostrarFuncionario(indiceAtual);

    }

});

const form = document.querySelector(".buscarempregado");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const id = Number(inputBusca.value);

    const funcionarioIndex = funcionarios.findIndex(
        funcionario => funcionario.id === id
    );

    if (funcionarioIndex !== -1) {

        indiceAtual = funcionarioIndex;

        mostrarFuncionario(indiceAtual);

    } else {

        alert("Funcionário não encontrado");

    }

});

// Carregar dados funcionários ao iniciar a página

carregarFuncionarios();