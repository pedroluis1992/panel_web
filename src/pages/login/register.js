import React from "react";
import { userContext } from "../../context/userContext";

export class Register extends React.Component {
  static contextType = userContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      isSuccess: true,
    };
  }

  onChangeEmail = (e) => {
    const { value: email } = e.target;
    this.setState({
      email,
    });
  };

  onChangePassword = (e) => {
    const { value: password } = e.target;
    this.setState({
      password,
    });
  };

  onChangeConfirmPassword = (e) => {
    const { value: passwordConfirm } = e.target;
    this.setState({
      passwordConfirm,
    });
  };

  saveUser = () => {
    this.context.setParentState({ user: { ...this.state } });
    this.props.history.push("/panel");
  };

  isValidEmail = () => {
    const { email } = this.state;
    const emailParts = email.split("@");
    if (
      emailParts.length !== 2 ||
      emailParts[0] === "" ||
      emailParts[1] === ""
    ) {
      return false;
    }
    return true;
  };

  isValidPassword = () => {
    const { password, passwordConfirm } = this.state;
    if (password === "") {
      return false;
    }
    if (password !== passwordConfirm) {
      return false;
    }
    return true;
  };

  isValid = () => {
    return this.isValidEmail() && this.isValidPassword();
  };

  render() {
    return (
      <>
        <form>
          <div className="form-group">
            <div
              className="d-flex justify-content-center"
              style={{ marginRight: "250px", marginTop: "100px" }}
            >
              <label>Email </label>
            </div>
            <div className="d-flex justify-content-center">
              <input
                style={{ width: "300px" }}
                type="email"
                className={`form-control ${
                  this.isValidEmail() ? "is-valid" : "is-invalid"
                }`}
                placeholder="Ingresa tu email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
          </div>
          <div className="form-group">
            <div
              className="d-flex justify-content-center"
              style={{ marginRight: "220px" }}
            >
              <label>Contraseña</label>
            </div>
            <div className="d-flex justify-content-center">
              <input
                style={{ width: "300px" }}
                type="password"
                className={`form-control ${
                  this.isValidPassword() ? "is-valid" : "is-invalid"
                }`}
                placeholder="Contraseña"
                value={this.password}
                onChange={this.onChangePassword}
              />
            </div>
          </div>
          <div className="form-group">
            <div
              className="d-flex justify-content-center"
              style={{ marginRight: "150px" }}
            >
              <label>Confirmar contraseña</label>
            </div>
            <div className="d-flex justify-content-center">
              <input
                style={{ width: "300px" }}
                type="password"
                className={`form-control ${
                  this.isValidPassword() ? "is-valid" : ""
                }`}
                placeholder="Confirma tu contraseña"
                value={this.passwordConfirm}
                onChange={this.onChangeConfirmPassword}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              disabled={!this.isValid()}
              onClick={this.saveUser}
              type="button"
              className="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </form>
      </>
    );
  }
}
