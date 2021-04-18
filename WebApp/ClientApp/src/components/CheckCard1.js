import React, { Component } from 'react';
// import './Check.css';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import "./CheckCard.css"

export class CheckCard1 extends Component {

    collection = [
        {
            En_name: "Home",
            Ru_name: "Дом",
            countOfTrue: 1,
       
        },
        {
            En_name: "Big",
            Ru_name: "Большой",
            countOfTrue: 3,
        },
        {
            En_name: "cat",
            Ru_name: "Кошка",
            countOfTrue: 2,
        }];


    getCollection() {
        const result = [];
        let card=this.collection.pop();
        let grad = `linear-gradient(to top, rgb(60, 62, 60) 10%, rgb(41, 41, 46)50%, rgb(60, 62, 60) 80%, green 100%)`
        result.push(
            <div className="collection2"  style={{ background: grad }}>
                <p>{card.En_name}</p>
                 <div className="answer">
                 <Link tag={Link} className="button"  to="/checkCard2">Я знаю</Link>
                 <Link tag={Link} className="button" to="/checkCard2">Я не знаю</Link>
                </div> 
            </div>);
        return <div className="collections">{result}</div>;
    }
    

    render() {
        return (
            <div className="box">
                {this.getCollection()}
            </div>
        );
    }
}