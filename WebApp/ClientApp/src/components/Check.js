import React, { Component } from 'react';
// import './Check.css';
import "./Check.css"
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';

export class Check extends Component {
    static displayName = Check.name;
    collection = [
        {
            name: "Путешествие",
            countWord: 10,
            progress: { know: 0, study: 100, notKnow: 0 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Фрукты и овощи",
            countWord: 10,
            progress: { know: 50, study: 30, notKnow: 20 }
        }];

    getCollection() {
        const result = [];
        for (const e of this.collection) {
            let grad = `linear-gradient(to right, green ${e.progress.know}%, yellow ${(e.progress.know+(e.progress.know>5?5:0))}%, yellow ${e.progress.know + e.progress.study}%, red ${e.progress.know + e.progress.study + 5}%)`
            result.push(
                <div className="collection">
                    <p>{e.name}</p>
                    <p>Слов {e.countWord}</p>
                    <div className="progress" style={{ background: grad }}></div>
                    <Link tag={Link} className="button" to="/checkCard1">Проверка</Link>
                </div>);
        }
        return <div className="collections">{result}</div>;
    }

    render() {
        return (
            <div className="box">
                <h3>Мои наборы</h3>
                {this.getCollection()}
            </div>
        );
    }

    // render() {
    //     return (
    //         <div className="card">
    //             <div className="word">House</div>
    //             <div className="answers">
    //                 <button href="#">Я знаю</button>
    //                 <button href="#">Я не знаю</button>
    //             </div>
    //         </div>

    //     );
    // }
}