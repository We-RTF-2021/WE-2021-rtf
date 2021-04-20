import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import "./NavMenu.css"
import authService from './api-authorization/AuthorizeService';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
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

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  getAccountElement() {
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      return (<NavLink tag={Link} className="sliding-button" to="/account">Личный кабинет</NavLink>);
    }
    else
      return null;
  }

  render() {
    return (
        <header>
            <Container>
                <div className="container1">
                    <NavLink tag={Link} className="custom-progress-bar" to="/">English Cards</NavLink>
                    <NavLink tag={Link} className="sliding-button" to="/check">Проверка</NavLink>
                    <NavLink tag={Link} className="sliding-button" to="/new-collection">Новый набор</NavLink>
                    {/* {this.getAccountElement()} */}
                    <LoginMenu></LoginMenu>
                </div>
            </Container>
        </header >
    );
  }
}
