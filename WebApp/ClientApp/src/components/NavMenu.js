import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import authService from './api-authorization/AuthorizeService';
import "./NavMenu.css"

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  // getAccountElement() {
  //   const { isAuthenticated } = this.state;
  //   if (isAuthenticated) {
  //     return (<NavLink tag={Link} className="sliding-button" to="/account">Личный кабинет</NavLink>);
  //   }
  //   else
  //     return null;
  // }

  render() {
    return (
      <header>
        <Container >
          <div className="menu">
            <NavLink className="menu-button main-button" to="/">English Cards</NavLink>
            <NavLink className="menu-button sliding-button" to="/check">Проверка</NavLink>
            <NavLink className="menu-button sliding-button" to="/new-collection">Новый набор</NavLink>
            <LoginMenu></LoginMenu>
          </div>
        </Container>
      </header >
    );
  }
}
