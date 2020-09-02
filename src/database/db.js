// Importar a dependência do sqlite3
// O método 'verbose' é algo como um log, ele exibe mensagens de erro no terminal.
const sqlite3 = require("sqlite3").verbose();

// Cria um objeto 'db' a partir da classe 'Database' dentro do sqlite3
// O parâmetro é o caminho onde será criado o arquivo database.db, que será o banco de dados.
const db = new sqlite3.Database("./src/database/database.db");

// Exporta o objeto db para ser usado em outras classe
// Para acessar algo exportado, é só usar o require.
module.exports = db;

// db.serialize(() => {
//     // Criar uma tabela se ela não existir
//     // Utilizando a crase para poder colocar a quebra de linha
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);

//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (
//             ?, ?, ?, ?, ?, ?, ?
//         );
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ];

//     // Não é possível utilizar a arrow function, quando está sendo utilizado o 'this' dentro da função.
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err);
//         }

//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }

//     // O 'run' roda os comando sqls no banco. insert, delete, update...
//     // db.run(query, values, afterInsertData);

//     // Consultar os dados no banco
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     console.log("Aqui estão seus registros: ");
//     //     console.log(rows);
//     // });

//     // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     console.log("Registro deletado com sucesso!");
//     // });
// });