Esse projeto foi feito com [Create React App](https://github.com/facebookincubator/create-react-app) e utilizando as bibliotecas pubsub-js, jquery, react-router-dom, além das bibliotecas carregadas com o Create React App. Para css foi utilizado o [pure-css](https://purecss.io/)<br> 

## Instruções para rodar o projeto

Para poder rodar o projeto basta instalar o [Node.js](https://nodejs.org/en/) e copiar o código utilizando o [Link](https://gitlab.com/andradebruno/indra-react/repository/master/archive.zip). Ou utilizar o comando abaixo para clonar o projeto do git

```
git clone git@gitlab.com:andradebruno/indra-react.git
```

Após copiar o código é necessário entrar no diretório raiz do projeto e seguir o comando abaixo e acessar o [Link](http://localhost:3000/) da aplicação:

```
...\indra-react>npm start
```

Para colocar como se fosse para produção (Todo compactado) basta rodar o comando abaixo e seguir as instrução ao final dele de instalação do server.

```
...\indra-react>npm run build
```

## Comentários

No projeto foi feito uma componetização do Input e Button para que fosse mais fácil a reutilização dos mesmo, fazendo assim com que o código ficasse mais limpo.
Também foi utilizado uma arquitetura de Box (High Order Component) para o projeto, onde o index.js chama o PedidoBox que é uma classe que serve de wrapper para os componentes do Formulário e da Tabela dos pedidos.

