import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCategoriaCliente from "./components/add-categoria.component";
import Categoria from "./components/categoria.component";
import CategoriaList from "./components/listar.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expanded-lg navbar-dark bg-dark">
                    <a href="/categoria" className="navbar-brand">Categoria</a>
                    <div className="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link to={"/categoria"} className="nav-link">
                                Categoria
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to={"/adicionar"} className="nav-link">
                                Adicionar
                            </Link>
                        </li>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/categoria"]} component={CategoriaList}/>
                        <Route exact path="/adicionar" component={AddCategoriaCliente}/>
                        <Route path="/categoria/:id" component={Categoria}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;