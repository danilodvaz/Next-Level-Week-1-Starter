// Importar a dependência do sqlite3
// O método 'verbose' é algo como um log, ele exibe mensagens de erro no terminar.
const sqlite3 = require("sqlite3").verbose();

// Cria um objeto 'db' a partir da classe 'Database' dentro do sqlite3
// O parâmetro é o caminho onde será criado o arquivo database.db, que será o banco de dados.
const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
    // Criar uma tabela se ela não existir
    // Utilizando a crase para poder colocar a quebra de linha
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

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
    `

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ];

    // Não é possível utilizar a arrow function, quando está sendo utilizado o 'this' dentro da função.
    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Cadastrado com sucesso");
        console.log(this);
    }

    db.run(query, values, afterInsertData);
});