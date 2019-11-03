import React, { Component } from "react";
import "./styles.css";
import { getUser } from "../../services/auth";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import { logout } from "../../services/auth";
import {
  faFolder,
  faFile,
  faArrowLeft,
  faSignInAlt,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

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

  handleClickSair = event => {
    logout();
    this.props.history.push("/login");
  };

  renderItens = () => {
    return this.state.paths.map((item, i) => {
      let url;
      let icon;
      let onClick = () => {};

      switch (item.tipo) {
        case "0":
          url = `/path/${item.pai}`;
          icon = faArrowLeft;
          break;
        case "1":
          url = `/path/${item.id}`;
          icon = faFolder;
          break;
        case "2":
          onClick = () => window.open(item.url_download, "_blank");
          url = "#";
          icon = faFile;
          break;
      }
      return (
        <li key={i}>
          <a href={url} className="item" onClick={onClick}>
            <FontAwesomeIcon
              icon={icon}
              color="#c8a851"
              style={{ marginRight: 10 }}
            />
            {item.descricao}
          </a>
        </li>
      );
    });
  };

  render() {
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
          <ul className="itens">{this.renderItens()}</ul>
        </div>
      </div>
    );
  }
}
