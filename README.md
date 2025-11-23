## Estrutura Back-end

- Criação da pasta backend com express e cors.
- Criação do arquivo db.js (conexão do banco de dados para o backend).
- Criação do arquivo server.js
- Criação do arquivo validation.js (validação)

## Estrutura Banco de dados (Mysql)

- Criação do banco de dados 

## Como rodar o projeto no frontend

OBS é necessário o node!!!!!!

- no terminal do VS code abre com o powershell.
- Depois digite **"cd .\frontend\"** e aperte enter.
- Logo digite **npm install** para instalar o arquivo node_modules e aperte enter.
- Depois digite  e aperte **npm run dev**.
- E abre o link que vai aparecer no terminal.

## Como rodar o projeto no backend

OBS é necessário o node!!!!!!

- no terminal do VS code abre com o powershell.
- Depois digite **"cd .\backend\"** e aperte enter.
- Logo digite **npm install** para instalar o arquivo node_modules e aperte enter
- Depois aperte **npm run dev** deve aparecer as mensagens no terminal do VS code: Servidor rodando na porta 3000;
  Conectado ao banco de dados com sucesso!"".

## Criação do banco de dados (Mysql)

- O arquivo mysql está salvo como zoologico_DB.sql.
- O arquivo db.js do backend contém as informações de conexão com o banco de dados.

const mysql = require('mysql2');

const connection =  mysql.createConnection({
    host: 'localhost' ,
    user: 'INSIRA O SEU USUARIO',
    password: 'INSIRA A SUA SENHA',
    database: 'zoologico_db',
})
