import React from "react";
import { Routes } from "./routes";
import { Link, Redirect } from "react-router-dom";
import { userContext } from "../context/userContext";

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { email: "", password: "", message: "", isSuccess: false },
    };
  }
  NavBar = () => (
    <nav
      className="navbar navbar-expand-lg navbar justify-content-between"
      style={{ backgroundColor: "#243387" }}
    >
      { !!this.state.user  && this.state.user.isSuccess  && (
        <>
          <div>
            <Link to="/panel">Panel</Link>
          </div>
            <label style={{color: "white"}}>{ this.state.user.email == undefined ? "" : `Usuario: ${this.state.user.email}`}</label>
          <Link
            to="/login"
            onClick={ () => this.setState({
              user: { email: "", password: "", message: "", isSuccess: false },
            })}
          >
            Log out
          </Link>
        </>
      )}
    </nav>
  );
  setParentState = (values) =>
    this.setState((prevState) => ({ ...prevState, ...values }));
  render() {

    console.log(this.props)
    return (
      <>
        <div className="container-fluid">
          {this.NavBar()}
          <div className="content bg-light">
            <div className="form-container">
              <userContext.Provider
                value={{
                  user: this.state.user,
                  setParentState: this.setParentState,
                }}
              >
                <Routes {...this.props} />
              </userContext.Provider>
            </div>
          </div>
        </div>
      </>
    );
  }
}
