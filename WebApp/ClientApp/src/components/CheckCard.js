import React, { Component } from 'react';
import "./CheckCard.css"
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

export class CheckCard extends Component {

    constructor(props) {
        super(props);
        this.state = { word: this.collection[0].En_name, id: 0, buttons: ["Я знаю", "Я не знаю"], pageState: this.firststate };
    }

    dict = {
        "Я знаю": { flag: true, way: ["Я так и думал", "Я ошибся"] },
        "Я не знаю": { flag: true, way: ["Вспомнил", "Запомню"] },
        "Я так и думал": { flag: false, param: 1 },
        "Я ошибся": { flag: false, param: -1 },
        "Вспомнил": { flag: false, param: -1 },
        "Запомню": { flag: false, param: 0 },
    };

    numberСorrectWords = 0;


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
        }
    ];

    reRender(prop) {
        if (prop === "Я так и думал") {
            this.numberСorrectWords++;
        }
        let newButtons = this.dict[prop].way;
        let newWord = this.collection[this.state.id].Ru_name;
        let newId = this.state.id;
        if (!this.dict[prop].flag) {
            newButtons = ["Я знаю", "Я не знаю"];
            newId = this.state.id + 1;
            if (newId === this.collection.length) {
                this.setState({ pageState: this.secondstate })
                return;
            }
            newWord = this.collection[newId].En_name;
            this.collection[this.state.id].countOfTrue = this.dict[prop].param
                ? this.collection[this.state.id].countOfTrue + this.dict[prop].param
                : 0;
        }
        this.setState({
            id: newId,
            word: newWord,
            buttons: newButtons,
        })
    }

    renderButtons() {
        let res = [];
        for (const e of this.state.buttons) {
            res.push(
                <button className="all-button answer-button" onClick={() => this.reRender(e)}>{e}</button>
            )
        }
        return <div className="answer">{res}</div>
    }


    firststate = () => {
        let grad = `linear-gradient(to top, rgb(60, 62, 60) 10%, rgb(41, 41, 46)50%, rgb(60, 62, 60) 80%, green 100%)`;
        return (
            <div className="card" style={{ background: grad }}>
                <p>{this.state.word}</p>
                {this.renderButtons()}
            </div>
        );
    }

    secondstate = () => (
        <div className="card result">
            <p>МОЛОДЕЦ!!!</p>
            {`Решено верно ${this.numberСorrectWords}/${this.collection.length}`}
            <NavLink tag={Link} className="all-button back" style={{ width: '200px' }} to="/check">К другим наборам</NavLink>

        </div>
    );

    render() {
        return (
            <div className="card-box">
                {this.state.pageState()}
            </div>
        );
    }


}