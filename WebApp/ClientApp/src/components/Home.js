import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import AuthorizeRoute from './api-authorization/AuthorizeRoute';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="info">
            Выучи английский быстро и просто!
            <NavLink className="all-button start" to="/check">Начать</NavLink>
      </div>
    );
  }
}
