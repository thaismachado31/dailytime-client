# Daily Time

Baseado num projeto de UX/UI desenvolvido pela Carolina Caetano da turma de UX/UI da Ironhack.

Aplicativo desenvolvido especialmente para pessoas portadoras de Sindrome de Down, com o fim de facilitar a noção de tempo em tarefas e eventos.

Navegue pelo aplicativo [daily time](https://daily-time-app.netlify.app/)

## Tecnologias 

### Front-end

#### Para o desenvolvimento do front-end foram utilizadas as seguintes tecnologias:

- [React](https://pt-br.reactjs.org/)
- [React-router-dom](https://v5.reactrouter.com/) (roteamento virtual de páginas/SPA)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/) (requisições http/CRUD)
- [Date-fns](https://date-fns.org/) (biblioteca para manipular data)
- [Netlify](https://www.netlify.com/) (plataforma para deploy do aplicativo em React)

### Features

- Dia da semana com indicador de evento/task
- Reminder de tarefa baseado em tempo
- Timeline renderizada e organizada por horário
- Upload de imagem para foto de perfil

### Executar o front-end localmente

#### Clonar o repositório

```sh
git clone https://github.com/thaismachado31/dailytime-client.git
```

#### Entrar na pasta e Instalar dependências

```sh
cd dailytime-client
npm install
```

#### Entrar na pasta e Instalar dependências

Alterar endereço da api para ambiente de produção e ambiente de desenvolvimento.
O arquivo a ser alterado se encontra dentro de src > apis > api.js

```sh
const apis = {
  development: "Endereço local da sua api, consultar readm do backend",
  production: "https://testedailyapi.herokuapp.com/",
};
```

### Rodar o script do React

```sh
npm start
```

<br>
Back-end:https://github.com/brunowake/dailytime

Projeto desenvolvido para o Bootcamp de Web Development da Ironhack por [André Leal](https://github.com/andreirece), [Bruno Wake](https://github.com/brunowake) e [Thaís Machado](https://github.com/thaismachado31)
Apresentação: [slides](https://docs.google.com/presentation/d/1hlPxue5IARrPvFwg8_uHHvngdMm_J3pu1Zm7NDVt79o/edit#slide=id.g134a2957081_0_2)
