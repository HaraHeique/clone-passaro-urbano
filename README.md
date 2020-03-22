# Clone Pássaro Urbano

Um simples clone do app Pássaro Urbano utilizando a framework [Angular](https://angular.io/) versão 9.

## Execução da Aplicação

### REST API Fake

Para executar a aplicação de forma satisfatória a partir da simulação de requisições para uma API REST de back-end é utilizado a biblioteca [json-server](https://github.com/typicode/json-server) que tem a capacidade de criar API REST fakes de forma simples e rápida através de um arquivo no formato json para que desenvolvedores front-end que necessitam de um back-end rápido para tanto prototipar quanto para mockar dados. Use o seguinte comando abaixo na raiz da aplicação para executar a fake API:

    npm install -g json-server
    json-server banco-de-dados.json

### Local

Abra o prompt de comando no raiz da aplicação e execute o comando abaixo. Após isso navegue até o `http://localhost:4200/`:

    ng serve

### Hospedagem

Esta se encontra [hospedada](https://haraheique.github.io/clone-passaro-urbano) no GitHub Pages. Entretanto, como dito anteriormente, não há uma real API back-end para serem feitas as requests, logo é necessário executar a API fake através do [json-server](https://github.com/typicode/json-server). Para checar o website basta clicar no link: https://haraheique.github.io/clone-passaro-urbano
