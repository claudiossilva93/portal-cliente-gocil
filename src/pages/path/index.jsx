import React, { Component } from "react";
import "./styles.css";
import { getUser } from "../../services/auth";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import { logout } from "../../services/auth";
import { faSignInAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FilePathItem } from "../../components";

export default class path extends Component {
  state = {
    user: getUser(),
    paths: [],
    pathId: this.props.match.params.id,
    loading: false
  };

  componentDidMount = () => {
    const pathId = this.state.pathId ? this.state.pathId : 0;
    const uri = `dataset/search?datasetId=PORTAL-DS002-DOCUMENTO&filterFields=usuario,${this.state.user.usuario},documentId,${pathId}`;
    api
      .get(uri)
      .then(response =>
        this.setState({ ...this.state, paths: response.data.content })
      )
      .catch(error => console.error(error));
  };

  handleClickSair = () => {
    logout();
    this.props.history.push("/login");
  };

  render() {
    let i = 0;
    return (
      <div className="container">
        <nav className="navbar">
          <img alt="logo" src={logo} className="logo" />
          <ul className="main-nav" style={{ position: "absolute", right: 0 }}>
            <li>
              <section className="user-info">
                <div>
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
                <span className="user-name">
                  <small>Bem vindo, {this.state.user.nome}</small>
                </span>
              </section>
            </li>
            <li>
              <a
                title="Sair"
                className="nav-icon"
                onClick={this.handleClickSair}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span className="link-sair"></span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="page-container">
          <ul className="itens">
            {this.state.paths.map(item => (
              <FilePathItem item={item} key={i++} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
