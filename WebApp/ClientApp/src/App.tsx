import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Check } from "./components/Check";
import { NewCollection } from "./components/NewCollection";

import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import "./custom.css";
import { CheckCard } from "./components/CheckCard";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <AuthorizeRoute path="/check" component={Check} />
        <AuthorizeRoute path="/new-collection" component={NewCollection} />
        <AuthorizeRoute path="/checkCard" component={CheckCard} />
        {<Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />}
      </Layout>
    );
  }
}