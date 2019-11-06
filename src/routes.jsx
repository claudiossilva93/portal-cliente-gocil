import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from "./pages/login/index";
import Path from "./pages/path/index";

const pathFluig = "/portal/001/GedCliente";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `${pathFluig}/login`,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`${pathFluig}/`} exact component={Login} />
      <Route path={`${pathFluig}/login`} exact component={Login} />
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/path" exact component={Path} />
      <PrivateRoute path="/path/:id" exact component={Path} />
      <Route
        path="*"
        component={route => {
          console.log(route);
          return <h1>Page not found</h1>;
        }}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
