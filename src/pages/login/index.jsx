import React, { Component } from "react";
import "./styles.css";
import logo from "../../assets/logo.png";
import background from "../../assets/bg.jpg";
import api from "../../services/api";
import { login } from "../../services/auth";

var backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundPosition: "center top"
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      message: "",
      conected: true
    };
  }

  handleClick = event => {
    event.preventDefault();
    const uri = `dataset/search?datasetId=dsCadastroClienteUsuarioPortal&filterFields=usuario,${this.state.login},senha,${this.state.password}`;
    this.setState({ ...this.state, message: "" });
    if (this.state.login.length === 0) {
      this.setState({ ...this.state, message: "Preencha o campo Usuário" });
      return;
    }
    if (this.state.login.password === 0) {
      this.setState({ ...this.state, message: "Preencha o campo Senha" });
      return;
    }
    api
      .get(uri)
      .then(response => {
        if (response.data.content.length > 0) {
          login(response.data.content[0]);
          this.props.history.push("/path");
        } else {
          this.setState({
            ...this.state,
            message: "Login e senha não conferem."
          });
        }
      })
      .catch(error => console.error(error));
  };

  handleLoginChange = event =>
    this.setState({ ...this.state, login: event.target.value });

  handlePasswordChange = event =>
    this.setState({ ...this.state, password: event.target.value });

  handleConectedChange = event =>
    this.setState({ ...this.state, conected: !this.state.conected });

  render() {
    return (
      <div id="login-container" style={backgroundStyle}>
        <form id="form" method="post">
          <img alt="logo" src={logo} />
          <input
            name="login"
            type="text"
            placeholder="Usuário"
            value={this.state.login}
            onChange={this.handleLoginChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button type="button" className="button" onClick={this.handleClick}>
            Entrar
          </button>
          <span className="text-danger">{this.state.message}</span>
        </form>
      </div>
    );
  }
}
