# EC01 — Gerenciamento de Alunos

Sistema de gerenciamento de alunos desenvolvido como atividade prática de HTML e JavaScript.

## Funcionalidades

- Cadastro de alunos com nome, idade, curso e nota final.
- Listagem dos alunos em uma tabela HTML.
- Edição e exclusão de alunos.
- Classe `Aluno`, com construtor e métodos `isAprovado()` e `toString()`.
- Mensagens de confirmação das operações.
- Relatórios atualizados automaticamente:
  - Alunos aprovados (nota final ≥ 7).
  - Média das notas finais.
  - Média das idades.
  - Nomes em ordem alfabética.
  - Quantidade de alunos por curso.

## Tecnologias utilizadas

- HTML5
- JavaScript
- Git e GitHub
- Docker Compose
- Nginx

## Como executar

**Pré-requisito:** Docker instalado e em execução.

1. Clone o repositório ou faça o download do projeto.
2. Abra um terminal na pasta do projeto.
3. Execute:

   `docker compose up -d`

4. Acesse a aplicação no navegador:

   `http://localhost:8080`

Para encerrar o contêiner, execute:

`docker compose down`

## Armazenamento dos dados

Os alunos são armazenados em um array de objetos JavaScript, na memória do navegador.

Não é utilizado banco de dados. Portanto, os dados cadastrados são perdidos ao atualizar ou fechar a página.

## Organização do projeto

- `index.html`: estrutura da interface, formulário, tabela e relatórios.
- `scripts.js`: classe Aluno, operações CRUD, eventos e geração dos relatórios.
- `compose.yaml`: configuração do ambiente Docker utilizando Nginx.

## Exercícios implementados

1. Cadastro de alunos com formulário e tabela (CRUD).
2. Orientação a objetos com a classe `Aluno`.
3. Eventos, funções anônimas e arrow functions.
4. Relatórios utilizando `filter()`, `map()`, `reduce()`, `sort()` e `forEach()`.