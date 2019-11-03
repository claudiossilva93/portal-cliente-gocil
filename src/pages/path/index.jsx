import React, { Component } from "react";
import "./styles.css";
import { getUser } from "../../services/auth";
import api from "../../services/api";

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

  renderItens = () => {
    return this.state.paths.map((item, i) => {
      let url;
      switch (item.tipo) {
        case "0":
          url = `/path/${item.pai}`;
          break;
        case "1":
          url = `/path/${item.id}`;
          break;
        case "2":
          url = item.url_download;
          break;
      }
      return (
        <li key={i}>
          <a href={url}>{item.descricao}</a>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="page-container">
            <span style={{ fontSize: "36", fontWeight: "bold" }}>
              Bem vindo, {this.state.user.nome}!
            </span>
            <span style={{ fontSize: "22" }}>PATHS</span>
            <ul>{this.renderItens()}</ul>
          </div>
        </div>
      </div>
    );
  }
}
