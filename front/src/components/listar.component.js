import React, { Component } from "react";
import CategoriaClienteDataService from "../services/categoriacliente.service";
import { Link } from "react-router-dom";

export default class CategoriaList extends Component {
    constructor(props){
        super(props);
        this.onChangeSearchCategoriaCliente = this.onChangeSearchCategoriaCliente.bind(this);
        this.retrieveCategoriaClientes = this.retrieveCategoriaClientes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCategoriaClientes = this.setActiveCategoriaClientes.bind(this);
        this.removeAllCategoriaClientes = this.removeAllCategoriaClientes.bind(this);
        this.searchCategoriaCliente = this.searchCategoriaCliente.bind(this);

        this.state = {
            CategoriaClientes: [],
            atual: null,
            indice: -1,
            pesquisa: ""
        }
    };

    componentDidMount(){
        this.retrieveCategoriaClientes();
    }

    onChangeSearchCategoriaCliente(e) {
        const pesquisa = e.target.value;

        this.setState({
            pesquisa: pesquisa
        });
    }

    retrieveCategoriaClientes(){
        CategoriaClienteDataService.getAll()
            .then(response => {
                this.setState({
                    categoriaclientes: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList(){
        this.retrieveCategoriaClientes();
        this.setState({
            atual: null,
            indice: -1
        })
    }

    setActiveCategoriaClientes(categoriacliente, indice){
        this.setState({
            atual: categoriacliente,
            indice: indice
        })
    }

    removeAllCategoriaClientes(){
        CategoriaClienteDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        })
    }

    searchCategoriaCliente(){
        CategoriaClienteDataService.findByCategoriaCliente(this.state.pesquisa)
            .then(response => {
                this.setState({
                    categoriaclientes: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            });
    }

    render(){
        const { pesquisa, categoriaclientes, atual, indice } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Pesquisa por categoria cliente"
                            value={pesquisa}
                            onChange={this.onChangeSearchCategoriaCliente}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchCategoriaCliente}
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Categoria Clientes</h4>
                    <ul className="list-group">
                        {categoriaclientes && categoriaclientes.map((categoriacliente, index) => (
                            <li
                                className={
                                    "list-group-item " + 
                                    (index === indice ? "active" : "")
                                }
                                onClick={() => this.setActiveCategoriaClientes(categoriacliente, index)}
                                key={index}
                            >
                                {categoriacliente.categoriacliente}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllCategoriaClientes}
                    >
                        Apagar tudo
                    </button>

                </div>
                <div className="col-md-6">
                    {atual ? (
                        <div>
                            <h4>Categoria Cliente</h4>
                            <div>
                                <label>
                                    <strong>Categoria Cliente</strong>
                                </label>{" "}
                                {atual.categoriacliente}
                            </div>
                            <div>
                                <label>
                                    <strong>Descricao</strong>
                                </label>{" "}
                                {atual.descricao}
                            </div>
                            <div>
                                <label>
                                    <strong>Publicado?</strong>
                                </label>{" "}
                                {atual.publicado ? "Publicado" : "Pendente"}
                            </div>

                            <Link
                                to={"/livraria/"+atual.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>
                        </div>
                    ):(
                        <div>
                            <br/>
                            <p>Insire uma Categoria Cliente</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}