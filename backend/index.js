const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const { animalSchema, validate } = require('./validators');

app.use(express.json());
app.use(cors());

app.post('/CadastrarAnimal', validate(animalSchema), (req, res) => {
    const { nome, especie, data_nascimento, origem, habitat, descricao } = req.validated;

    const query = `INSERT INTO animais (nome, especie, data_nascimento, origem, habitat, descricao)
                VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(query, [nome, especie, data_nascimento || null, origem, habitat, descricao], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao cadastrar animal', error: err })
        } else {
            res.status(201).send({ message: 'Ánimal cadastrado com sucesso!' })
        }
    });

});


app.post('/CadastrarCuidado', (req, res) => {
    const { tipo, frequencia, descricao } = req.body;

    const query = `INSERT INTO cuidados (tipo, frequencia, descricao)
                VALUES (?, ?, ?)`;

    connection.query(query, [tipo, frequencia, descricao], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao cadastrar cuidado', error: err })
        } else {
            res.status(201).send({ message: 'Cuidado cadastrado com sucesso!' })
        }
    });

});



app.get('/cuidado', (req, res) => {
    connection.query('SELECT * FROM cuidados', (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao obter dados', error: err })
        } else {
            res.status(200).json(result);
        }
    })
})

app.get('/animais', (req, res) => {
    connection.query('SELECT * FROM animais', (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao obter dados', error: err })
        } else {
            res.status(200).json(result);
        }
    })


})

app.get('/animais/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM animais WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao obter dados do animal', error: err });
        } else if (result.length === 0) {
            res.status(404).send({ message: 'Animal não encontrado' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});

app.get('/cuidado/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM cuidados WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao obter dados do cuidado', error: err });
        } else if (result.length === 0) {
            res.status(404).send({ message: 'Cuidado não encontrado' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});



app.delete('/Excluir-animal/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM animais WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao excluir animal', error: err });
        } else {
            res.status(200).send({ message: 'Animal excluido com sucesso' });
        }
    });
});



app.delete('/Excluir-cuidados/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM cuidados WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao excluir cuidados', error: err });
        } else {
            res.status(200).send({ message: 'Cuidados excluido com sucesso' });
        }
    });
});

app.put('/Atualizar-cuidados/:id', (req, res) => {
    const { id } = req.params;
    const { tipo, frequencia, descricao } = req.body;

    const query = `UPDATE cuidados SET tipo = ?, frequencia = ?, descricao = ? WHERE id = ?`

    connection.query(query, [tipo, frequencia, descricao, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao atualizar cuidado', error: err });
        } else {
            res.status(200).send({ message: 'Cuidado atualizado com sucesso!' })
        }
    });
});

app.put('/Atualizar-animais/:id', validate(animalSchema), (req, res) => {
    const { id } = req.params;
    const { nome, especie, data_nascimento, origem, habitat, descricao } = req.validated;


    const query = `UPDATE animais SET nome = ?, especie = ?, data_nascimento = ?, origem = ?, habitat = ?, descricao = ? WHERE id = ?`

    connection.query(query, [nome, especie, data_nascimento, origem, habitat, descricao, id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao atualizar animal', error: err });
        } else {
            res.status(200).send({ message: 'Dados do animal atualizado com sucesso!' })
        }
    });
});


app.delete('/Excluir-animal/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM animais WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao deletar animal', error: err });
        } else {
            res.status(200).send({ message: 'Animal deletado com sucesso' });
        }
    });
});


app.delete('/Excluir-cuidado/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM cuidados WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Erro ao deletar cuidados', error: err });
        } else {
            res.status(200).send({ message: 'Cuidado deletado com sucesso' });
        }
    });
});





app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});