// Dependência "express" permite criar um servidor web
const express = require("express"); //Pega a classe express e coloca na variável
const server = express(); //Inicia o express

// Dependência "nunjucks" é um template engine.
// Deixa os htmls dinâmicos, perminto a utilização de variáveis, estruturas de repetição e condição
// Nesse caso será configurado para funcionar junto com o "express"
const nunjucks = require("nunjucks");
// Configuração do nunjucks.
// O primeiro parâmetro é o local onde estão os htmls
// O segundo, é um objeto que informa propriedades para configuração, como o servidor que está sendo utilizado
// e o desligamento do cache, para evitar bugs durante o desenvolvimento
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

// Configurar pasta public, como pública.
// Com isso eu consigo acessar os arquivos pelo servidor na url.
server.use(express.static("public"));

// Configurar os caminho da aplicação (rotas)
// "/" -> Página inicial
// get -> Verbos http (get, post, put, delete...)
// req -> Requisição
// res -> Resposta
server.get("/", (req, res) => {
    // Envia uma reposta
    // res.send("xablau")
    
    // Envia um arquivo
    // __dirname -> retorna o diretório do arquivo atual
    // res.sendFile(__dirname + "/views/index.html");
    
    // Com o nunjucks, a resposta é o html reinderizado.
    // Ele pega o html dinâmico, reinderiza passando pelo motor, e devolve o html completo.
    // Como na configuração do nunjucks já foi informado o caminho dos htmls, basta informar o html que será reinderizado e retornado
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.get("/search", (req, res) => {
    return res.render("search-results.html");
});

// Ligar o servidor
server.listen(3000);