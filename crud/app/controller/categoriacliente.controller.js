const db = require("../model");
const CategoriaCliente = db.categoriaclientes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const categoriacliente = {
        descricao: req.body.descricao,
    };

    CategoriaCliente.create(categoriacliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu."
            });
        });
};

exports.findAll = (req, res) => {
    CategoriaCliente.findAll({ where: cond })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    CategoriaCliente.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `ID não encontrado: ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao encontrar id: " + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    CategoriaCliente.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Update com sucesso!"
                });
            } else {
                res.send({
                    message: `Impossivel atualizar o id ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Erro ao atualizar id ${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    CategoriaCliente.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deletou com sucesso"
                });
            } else {
                res.send({
                    message: `Não foi possível deletar id ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Não foi possível deletar id ${id}`
            });
        });
};

exports.deleteAll = (req, res) => {
    CategoriaCliente.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} de linhas deletadas` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erros ocorreram ao apagar dados"
            });
        });
};

exports.findAllPublicado = (req, res) => {
    CategoriaCliente.findAll({ where: { publicado: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erros aconteceram"
            });
        });
};
