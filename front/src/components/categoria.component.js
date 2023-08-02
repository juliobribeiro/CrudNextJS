import React, { Component } from "react";
import CategoriaClienteDataService from "../services/categoriacliente.service";

export default class Categoria extends Component{
    constructor(props){
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.getCategoriaCliente = this.getCategoriaCliente.bind(this);
        this.updateCategoriaCliente = this.updateCategoriaCliente.bind(this);
        this.deleteCategoriaCliente = this.deleteCategoriaCliente.bind(this);

        this.state = {
            atual: {
                id: null,
                titulo: "",
                nome: "",
                publicado: false
            },
            message: ""
        };
    }

    componentDidMount(){
        this.getCategoriaCliente(this.props.match.params.id);
    }
  
    onChangeNome(e) {
        const nome = e.target.value;

        this.setState(prevState => ({
            atual: {
                ...prevState.atual,
                nome: nome
            }
        }));
    }

    getCategoriaCliente(id) {
        CategoriaClienteDataService.get(id)
            .then(response => {
                this.setState({
                    atual: response.data
                });
                console.lolg(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCategoriaCliente(){
        CategoriaClienteDataService.update(
            this.state.atual.id,
            this.state.atual
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "Update com sucesso!"
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteCategoriaCliente(){
        CategoriaClienteDataService.delete(this.state.atual.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/Categoria')
            })
            .catch(e => {
                console.log(e);
            })
    }

    render(){
        const { atual } = this.state;

        return (
        <div>
            {atual ? (
            <div className="edit-form">
                <h4>CategoriaCliente</h4>
                <form>
                
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={atual.nome}
                    onChange={this.onChangeNome}
                    />
                </div>
            </form>

                <button
                className="badge badge-danger mr-2"
                onClick={this.deleteCategoriaCliente}
                >
                Deletar
                </button>

                <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateCategoriaCliente}
                >
                Atualizar
                </button>
                <p>{this.state.message}</p>
            </div>
            ) : (
            <div>
                <br />
                <p>Clique em uma Categoria Cliente</p>
            </div>
            )}
        </div>
        );
    }
}