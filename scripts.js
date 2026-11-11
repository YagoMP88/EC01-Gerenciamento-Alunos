let nome = document.getElementById("nome");
let idade = document.getElementById("idade");
let curso = document.getElementById("curso");
let notaFinal = document.getElementById("notaFinal");
let botaoCadastro = document.getElementById("btnCadastrar");
let tabela = document.getElementById("tabela");
let alunos = [];
let alunoEmEdicao = null;

class Aluno{
    constructor(nome,idade,curso,notaFinal){
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado(){
        return this.notaFinal >=7;
    }

    toString() {
    return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

function cadastrarAluno() {
    let aluno = new Aluno(
        nome.value,
        Number(idade.value),
        curso.value,
        Number(notaFinal.value)
    );

    alunos.push(aluno);

    alert(`Aluno ${aluno.nome} cadastrado com sucesso!`);
}

function excluirAluno(aluno) {
    let indice = alunos.findIndex((item) => item === aluno);

    if (indice !== -1) {
        alunos.splice(indice, 1);
        atualizarTabela();

        alert(`Aluno ${aluno.nome} excluído com sucesso!`);
    }
}

function editarAluno(aluno) {
    nome.value = aluno.nome;
    idade.value = aluno.idade;
    curso.value = aluno.curso;
    notaFinal.value = aluno.notaFinal;

    alunoEmEdicao = aluno;
    botaoCadastro.value = "Salvar";
}

function salvarEdicao() {
    if (alunoEmEdicao === null) {
        return;
    }

    alunoEmEdicao.nome = nome.value;
    alunoEmEdicao.idade = Number(idade.value);
    alunoEmEdicao.curso = curso.value;
    alunoEmEdicao.notaFinal = Number(notaFinal.value);

    alert(`Aluno ${alunoEmEdicao.nome} atualizado com sucesso!`);
    alunoEmEdicao = null;
    botaoCadastro.value = "Cadastrar";
}

function atualizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach((aluno) => {
        let linha = tabela.insertRow();

        linha.insertCell().textContent = aluno.nome;
        linha.insertCell().textContent = aluno.idade;
        linha.insertCell().textContent = aluno.curso;
        linha.insertCell().textContent = aluno.notaFinal;
        let celulaAcoes = linha.insertCell();

        // Botão Editar
        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.type = "button";

        // Botão Excluir
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.type = "button";

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);

        //Ação Botão Excluir
        botaoExcluir.addEventListener("click", function() {
            excluirAluno(aluno);
        });

        //Ação Botão Editar
        botaoEditar.addEventListener("click", function() {
            editarAluno(aluno);
        });
    });
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (alunoEmEdicao === null) {
        cadastrarAluno();
    } else {
        salvarEdicao();
    }

    atualizarTabela();
    document.querySelector("form").reset();
});


