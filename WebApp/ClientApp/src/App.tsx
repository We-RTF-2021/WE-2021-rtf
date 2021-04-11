import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { NewWord } from "./components/NewWord";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <AuthorizeRoute path="/check" component={Home} />
        <AuthorizeRoute path="/new-words" component={NewWord} />
        <AuthorizeRoute path="/new-collection" component={Home} />
        {/* <AuthorizeRoute path="/account" component={Home} /> */}
        {/* <AuthorizeRoute path="/fetch-data" component={FetchData} /> */}
        {<Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />}
      </Layout>
    );
  }
}