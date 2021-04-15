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
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.collapsed} navbar>
            <div className="container1">
              <NavLink tag={Link} className="custom-progress-bar" to="/">English Cards</NavLink>
              <NavLink tag={Link} className="sliding-button" to="/check">Проверка</NavLink>
              <NavLink tag={Link} className="sliding-button" to="/new-collection">Новый набор</NavLink>
              {/* {this.getAccountElement()} */}
              <LoginMenu></LoginMenu>
            </div>
          </Collapse>
        </Container>
      </header >
    );
  }


  // render() {
  //   return (
  //     <header>
  //       <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
  //         <Container>
  //           <NavbarBrand tag={Link} to="/">English Cards</NavbarBrand>
  //           <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
  //           <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
  //             <ul className="navbar-nav flex-grow">
  //               <NavItem>
  //                 <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
  //               </NavItem>
  //               <NavItem>
  //                 <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
  //               </NavItem>
  //               <NavItem>
  //                 <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
  //               </NavItem>
  //               <LoginMenu>
  //               </LoginMenu>
  //             </ul>
  //           </Collapse>
  //         </Container>
  //       </Navbar>
  //     </header>
  //   );
  // }
}
