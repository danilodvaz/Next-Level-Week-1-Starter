// Dependência "express" permite criar um servidor web
const express = require("express"); //Pega a classe express e coloca na variável
const server = express(); //Inicia o express

// Pega o objeto db que foi exportado no arquivo db.js
const db = require("./database/db");

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

// Configurar o express para receber o body da requisição (POST)
server.use(express.urlencoded({ extended: true }));

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
    // Retonar as query strings da url
    // req.query;

    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
    // Retorna o que foi enviado pelo POST
    // Foi necessário configurar o "express" para utilizar o body
    // req.body

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?
        );
    `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    // Não é possível utilizar a arrow function, quando está sendo utilizado o 'this' dentro da função.
    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {

    const search = req.query.search;

    if(search == "") {
        // return res.render("search-results.html", { total: 0 });
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        const total = rows.length;

        // No objeto do js, quando o nome da variável é o mesmo nome da propriedade, não precisa passar o nome da propriedade
        // No caso do { total: total }, poderia ser apenas { total }
        return res.render("search-results.html", { places: rows, total: total });
    });

});

// Ligar o servidor
server.listen(3000);