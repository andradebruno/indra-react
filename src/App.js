import React, { Component } from "react";
import "./css/pure-min.css";
import "./css/side-menu.css";
import {Link} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span />
        </a>
        <div id="menu">
          <div className="pure-menu">
            <Link className="pure-menu-heading" to="/">
              Lanchonete
            </Link>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link to="/pedido" className="pure-menu-link">
                  Pedido
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;