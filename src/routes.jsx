import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from "./pages/login/index";
import Path from "./pages/path/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/portal/001/GedCliente/login",
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
      <Route path="/portal/001/GedCliente/" exact component={Login} />
      <Route path="/portal/001/GedCliente/login" exact component={Login} />
      <PrivateRoute path="/portal/001/GedCliente/path" exact component={Path} />
      <PrivateRoute
        path="/portal/001/GedCliente/path/:id"
        exact
        component={Path}
      />
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
