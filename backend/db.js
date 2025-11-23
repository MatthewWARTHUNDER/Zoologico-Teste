const mysql = require('mysql2');

const connection =  mysql.createConnection({
    host: 'localhost' ,
    user: 'root',
    password: 'root',
    database: 'zoologico_db',
})

connection.connect(err => {
    if (err){
        console.error('Erro ao conectar o banco de dados', err)
        return;
    }
    console.log('Conectado no banco de dados com sucesso!')
})

module.exports = connection;