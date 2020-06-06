import React from "react";
import {userContext} from '../../context/userContext';

const users = [
  {
    email: "pedro@hotmail.com",
    password: "12345",
  },
];
export class Login extends React.Component {
  static contextType = userContext;

  constructor(props,context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      message: "",
      isSuccess: true,
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.resetAlertMessage = this.resetAlertMessage.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetAlertMessage() {
    setTimeout(() => {
      this.setState({
        message: "",
      });
    }, 1000);
  }

  resetPassword() {
    this.setState({
      password: "",
    });
  }

  onChangeEmail(e) {
    const { value: email } = e.target;
    this.setState({
      email,
    });
  }

  onChangePassword(e) {
    const { value: password } = e.target;
    this.setState({
      password,
    });
  }

  onClickSubmit() {
    const { email, password } = this.state;
    const userFound = users.findIndex(
      (user) => user.email === email && user.password === password
    );

    if (userFound !== -1) {
      this.context.setParentState({user: { ...this.state }})
      this.props.history.push("/panel", { email: this.state.email });
    } else {
      this.setState({
        message: `Error al intentar entrar`,
        isSuccess: false,
      });
      this.resetAlertMessage();
      this.resetPassword();
    }
  }

  goToRegister = () => {
    this.props.history.push("/register");
  };

  render() {

    return (
      <>
        {this.state.message &&
          (this.state.isSuccess ? (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          ))}
        <form>
          <div className="form-group" style={{ marginTop: "100px" }}>
            <div
              className="d-flex justify-content-center"
              style={{ marginRight: "250px" }}
            >
              <label htmlFor="exampleInputEmail1">Email</label>
            </div>
            <div className="d-flex justify-content-center">
              <input
                style={{ width: "300px" }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Ingresa tu email"
                onChange={this.onChangeEmail}
                value={this.state.email}
              />
            </div>
          </div>
          <div className="form-group">
            <div
              className="d-flex justify-content-center"
              style={{ marginRight: "220px" }}
            >
              <label htmlFor="exampleInputPassword1">Contraseña</label>
            </div>

            <div className="d-flex justify-content-center">
              <input
                style={{ width: "300px" }}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Contraseña"
                onChange={this.onChangePassword}
                value={this.state.password}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">

          <div className="form-group">
          </div>
          <button
            type="button"
            onClick={this.onClickSubmit}
            className="btn btn-primary"
          >
            Entrar
          </button>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <a href="#" onClick={this.goToRegister}>
              Registrarse
            </a>
          </div>
        </form>
      </>
    );
  }
}
