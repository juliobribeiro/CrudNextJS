import React, { Component } from "react";
import CategoriaClienteDataService from "../services/categoriacliente.service";

export default class AddCategoriaCliente extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.saveCategoriaCliente = this.saveCategoriaCliente.bind(this);
        this.novoCategoriaCliente = this.novoCategoriaCliente.bind(this);

        this.state = {
            id: null,
            nome: "",
            enviado: false
        };
    }

    onChangeNome(e){
        this.setState({
            nome: e.target.value
        })
    }

    saveCategoriaCliente(){
        var data = {
            nome: this.state.nome,
        };

        CategoriaClienteDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    nome: response.data.nome,
                    enviado: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    novoCategoriaCliente(){
        this.setState({
            id: null,
            nome: "",
            enviado: false
        });
    }

    render(){
        return (
            <div className="submit-form">
                {this.state.enviado ? (
                    <div>
                        <h4>Enviado com sucesso</h4>
                        <button className="btn btn-success" onClick={this.novoCategoriaCliente}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                required
                                value={this.state.nome}
                                onChange={this.onChangeNome}
                                name="nome"/>
                        </div>
                        <button onClick={this.saveCategoriaCliente} className="btn btn-success">
                            Enviar
                        </button>
                    </div>
                )}
            </div>
        )
    }
}