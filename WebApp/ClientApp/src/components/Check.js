import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import "./Check.css"
import { Link } from 'react-router-dom';

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
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
        },
        {
            name: "Транспорт",
            countWord: 10,
            progress: { know: 10, study: 30, notKnow: 60 }
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
            let grad = `linear-gradient(to right, green ${e.progress.know}%, yellow ${(e.progress.know + (e.progress.know > 5 ? 5 : 0))}%, yellow ${e.progress.know + e.progress.study}%, red ${e.progress.know + e.progress.study + 5}%)`
            result.push(
                <div className="collection">
                    <p><b>{e.name}</b></p>
                    <p>{e.countWord} слов</p>
                    <div className="progress" style={{ background: grad }}></div>
                    <NavLink tag={Link} className="all-button collection-button" to="/checkCard">Проверка</NavLink>
                </div>);
        }
        return <div className="collections">{result}</div>;
    }

    render() {
        return (
            <div className="collections-box">
                <h2>Мои наборы</h2>
                {this.getCollection()}
            </div>
        );
    }
}