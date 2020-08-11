const express = require("express"); //Pega a classe express e coloca na variável
const server = express(); //Inicia o express

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
    res.sendFile(__dirname + "/views/index.html");
});

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html");
});

server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html");
});

// Ligar o servidor
server.listen(3000);