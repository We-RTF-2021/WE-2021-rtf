import React, { Component } from 'react';
// import './Check.css';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import "./CheckCard.css"

export class CheckCard2 extends Component {

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
        result.push(
            <div className="collection2">
                <p>{card.Ru_name}</p>
                 <div className="answer">
                 <Link tag={Link} className="button" to="/checkCard3">Я так и думал</Link>
                 <Link tag={Link} className="button" to="/checkCard3">Я ошибся</Link>
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