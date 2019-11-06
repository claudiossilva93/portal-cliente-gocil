import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from "./pages/login/index";
import Path from "./pages/path/index";

const rotaFluig = "/portal/001/GedCliente";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `${rotaFluig}/login`,
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
      <Route path={`${rotaFluig}/`} exact component={Login} />
      <Route path={`${rotaFluig}/login`} exact component={Login} />
      <PrivateRoute path={`${rotaFluig}/path`} exact component={Path} />
      <PrivateRoute path={`${rotaFluig}/path/:id`} exact component={Path} />
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
