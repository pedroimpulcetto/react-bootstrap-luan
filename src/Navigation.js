import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component {

    render() {
        return(
           <Navbar bg="warning" expand="lg">
               <Navbar.Toggle aria-controls="basic-navbar-nav"/>
               <Navbar.Collapse id="basic-navbar-nav">
                   <Nav>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/">
                           Home
                       </NavLink>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/buscaposto">
                           Busca Posto
                       </NavLink>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/avaliacao">
                           Cadastrar Avaliação
                       </NavLink>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/preco">
                           Cadastrar Preço
                       </NavLink>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/posto">
                           Cadastrar Posto
                       </NavLink>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/listapostos">
                           Listar Postos Cadastrados
                       </NavLink>
                       <NavLink className="d-inline p-2 bg-warning text-dark" to="/tipocombustivel">
                           Tipo de Combustível
                       </NavLink>
                   </Nav>
               </Navbar.Collapse>
           </Navbar>
        )
    }
}