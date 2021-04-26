import React, { Component } from 'react';
import "./CheckCard.css"
import { Link } from 'react-router-dom';

export class CheckCard extends Component {
    constructor(props) {
        super(props);

        this.correct = this.correct.bind(this);
        this.incorrect = this.incorrect.bind(this);

        this.state = { id: 0, numberСorrectWords: 0 };
    }

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
            En_name: "Сat",
            Ru_name: "Кошка",
            countOfTrue: 2,
        }
    ];

    correct() {
        this.setState((state) => {
            state.id++;
            state.numberСorrectWords++;
            return state;
        });
    }

    incorrect() {
        this.setState((state) => {
            state.id++;
            return state;
        });
    }


    // TODO: вообще прикольно было бы сделать анимацию передвижения карточек
    render() {
        return (
            <div className="card-box">
                {
                    this.state.id !== this.collection.length ?
                        <CommonCardTest key={this.state.id} english={this.collection[this.state.id].En_name} russian={this.collection[this.state.id].Ru_name} correct={this.correct} incorrect={this.incorrect} />
                        :
                        <Finish correct={this.state.numberСorrectWords} total={this.collection.length} />
                }
            </div>
        );
    }
}

class CommonCardTest extends Component {
    constructor(props) {
        super(props);
        this.hover = this.hover.bind(this);
    }
    changeButtons1() {
        document.getElementById('b1').textContent = "Так и знал";
        document.getElementById('b2').textContent = "Ошибся";

        document.getElementById('flip').classList.toggle('hover');
    }
    changeButtons2() {
        document.getElementById('b1').textContent = "Вспомнил";
        document.getElementById('b2').textContent = "Запомню";

        document.getElementById('flip').classList.toggle('hover');
    }

    hover() {
        //document.getElementById('flip').classList.toggle('hover');
    }

    render() {
        return (
            <div id="flip" className="flip-container">
                <div className="flipper">
                    <div className="front">
                        <div className="card">
                            <p>{this.props.english}</p>
                            <div className="answer">
                                <a className="all-button answer-button" onClick={this.changeButtons1}>Знаю</a>
                                <a className="all-button answer-button" onClick={this.changeButtons2}>Не знаю</a>
                            </div>
                        </div>
                    </div>
                    <div className="back">
                        <div className="card">
                            <p>{this.props.russian}</p>
                            <div className="answer">
                                <a id="b1" className="all-button answer-button" onClick={() => { this.props.correct(); this.hover(); }} ></a>
                                <a id="b2" className="all-button answer-button" onClick={() => { this.props.incorrect(); this.hover(); }}></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Finish extends Component {

    render() {
        return (
            <div id="flip" className="flip-container">
                <div className="front">
                    <div className="card">
                        <p>{this.props.correct} из {this.props.total}</p>
                        <div className="answer">
                            <Link className="all-button answer-button" to='/check'>К другим наборам</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}