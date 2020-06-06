import React from "react";
import { Switch, Route } from "react-router-dom";
import { Panel } from "../pages/panel";
import { Projects } from "../pages/projects";
import { Register } from "../pages/login/register";
import { Login } from "../pages/login";
import { Users } from "../pages/users";

export class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {}
    };

  }


  render() {
    return (
      <Switch>  
         <Route
          children={(props) => <Login {...props} />}
          exact
          path="/"
        />  
        <Route
          children={(props) => <Register {...props} />}
          exact
          path="/register"
        />
        <Route children={(props) => <Login {...props} />} exact path="/login" />
          <Route
            children={(props) => <Panel {...props} />}
            exact
            path="/panel"
          />
           <Route
            children={(props) => <Projects {...props} />}
            exact
            path="/proyectos"
          />
           <Route
            children={(props) => <Users {...props} />}
            exact
            path="/usuarios"
          />
      </Switch>
    );
  }
}
