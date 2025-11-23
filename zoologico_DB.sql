CREATE DATABASE zoologico_DB;

USE zoologico_DB;


CREATE TABLE animais(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    origem VARCHAR(100),
    habitat VARCHAR(100),
	descricao TEXT,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cuidados(
	id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('alimentacao', 'Cuidado veterinario', 'recinto', 'treinamento') NOT NULL,
    frequencia ENUM('diaria', 'semanal', 'mensal') NOT NULL,
    descricao TEXT,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


SELECT * FROM animais;
SELECT * FROM cuidados;


