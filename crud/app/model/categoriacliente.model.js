module.exports = (sequelize, Sequelize) => {
    const CategoriaCliente = sequelize.define("categoriacliente", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: Sequelize.STRING
        }
    });
    return CategoriaCliente;
    
}