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
        if (alunoEmEdicao === aluno) {
            alunoEmEdicao = null;
            botaoCadastro.value = "Cadastrar";
            document.querySelector("form").reset();
        }
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
      gerarRelatorios();
}

function gerarRelatorios() {
    //Aprovados
    let aprovados = alunos.filter((aluno) => aluno.isAprovado());

    let nomesAprovados = aprovados.map((aluno) => aluno.nome);

    let resultado = document.getElementById("relatorioAprovados");

    resultado.textContent = nomesAprovados.length > 0
        ? nomesAprovados.join(", ")
        : "Nenhum aluno aprovado.";

    //Media Nota    
    let somaNotas = alunos.reduce((soma, aluno) => soma + aluno.notaFinal, 0);

    let mediaNotas = alunos.length > 0
        ? somaNotas / alunos.length
        : 0;

    let resultadoMedia = document.getElementById("relatorioMediaNotas");

    resultadoMedia.textContent = mediaNotas.toFixed(2);

    // Média das idades
    let somaIdades = alunos.reduce((soma, aluno) => soma + aluno.idade, 0);

    let mediaIdades = alunos.length > 0
        ? somaIdades / alunos.length
        : 0;

    let resultadoIdades = document.getElementById("relatorioMediaIdades");

    resultadoIdades.textContent = `${mediaIdades.toFixed(2)} anos`;    

    // Alunos em ordem alfabética
    let nomesOrdenados = alunos
        .map((aluno) => aluno.nome)
        .sort((a, b) => a.localeCompare(b, "pt-BR"));

    let resultadoOrdem = document.getElementById("relatorioOrdemAlfabetica");

    resultadoOrdem.textContent = nomesOrdenados.length > 0
        ? nomesOrdenados.join(", ")
        : "Nenhum aluno cadastrado.";
    
    // Quantidade de alunos por curso
    let quantidadeCursos = {
        JavaScript: 0,
        Python: 0,
        Java: 0
    };

    alunos.forEach((aluno) => {
        quantidadeCursos[aluno.curso]++;
    });

    let resultadoCursos = document.getElementById("relatorioQuantidadeCursos");

    resultadoCursos.textContent =
        `JavaScript: ${quantidadeCursos.JavaScript} | ` +
        `Python: ${quantidadeCursos.Python} | ` +
        `Java: ${quantidadeCursos.Java}`;    
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
gerarRelatorios();