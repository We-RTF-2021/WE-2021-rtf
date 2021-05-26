import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Check } from "./components/Check";
import { CheckCard } from "./components/CheckCard";
import { NewCollection } from "./components/NewCollection";
import { StarsBackground } from "./components/StarsBackground";

import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (<>
      <StarsBackground/>
          <Layout>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <AuthorizeRoute path="/check" component={Check} />
                  <AuthorizeRoute path="/new-collection" component={NewCollection} />
                  <AuthorizeRoute path="/checkCard" component={CheckCard} />
              </Switch>
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout> </>
    );
  }
}
