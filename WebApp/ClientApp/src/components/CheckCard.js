import React, { Component } from 'react';
import "./CheckCard.css"
import { NavLink, Redirect } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'
import { Loader } from "./Loader.js"

export class CheckCard extends Component {
    constructor(props) {
        super(props);

        this.correct = this.correct.bind(this);
        this.confirm = this.confirm.bind(this);
        this.incorrect = this.incorrect.bind(this);

        this.state = { id: 0, numberСorrectWords: 0, collection: [], loading: true, redirect: false };
    }

    cardsCorrect = [];

    componentDidMount() {
        if (this.props.location.propsSearch)
            this.getData();
    }


    correct() {
        this.setState((state) => {
            let i = 0;
            for (; i < this.cardsCorrect.length; i++)
                if (this.cardsCorrect[i].cardId === state.collection[state.id].card.cardID) break;
            if (i === this.cardsCorrect.length) {
                this.cardsCorrect.push({ cardId: state.collection[state.id].card.cardID, isTrue: true });
            }
            state.id++;
            state.numberСorrectWords++;
            return state;
        });
    }

    incorrect() {
        this.setState((state) => {
            let i = 0;
            for (; i < this.cardsCorrect.length; i++)
                if (this.cardsCorrect[i].cardId === state.collection[state.id].card.cardID) {
                    this.cardsCorrect[i].isTrue = false;
                    break;
                };
            if (i === this.cardsCorrect.length) {
                this.cardsCorrect.push({ cardId: state.collection[state.id].card.cardID, isTrue: false });
            }
            state.id++;
            return state;
        });
    }
    async getData() {
        const id = await authService.getUser();
        const token = await authService.getAccessToken();
        const response = await fetch(`card?userId=${id.sub}&setId=${this.props.location.propsSearch}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        let initLen = data.length;
        const testTypes = ["common", "inverse", "input"];
        for (let i = 0; i < initLen; i++) {
            this.mixArray(testTypes);
            data[i].testType = testTypes[0];
            let card = data[i].card;
            let status = data[i].status;
            if (data[i].status < 1)
                data.push({ card, status, testType: testTypes[1] });
            if (data[i].status < 2)
                data.push({ card, status, testType: testTypes[2] });
        }
        this.mixArray(data);

        this.setState({ collection: data, loading: false });
    }

    mixArray(array) {
        array.sort(() => Math.random() - 0.5);
    }

    async confirm() {
        const id = await authService.getUser();
        let result = { userId: id.sub, setId: this.props.location.propsSearch, cardIds: this.cardsCorrect }
        const token = await authService.getAccessToken();
        let response = await fetch(`card`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(result)
        });
        this.setState({ redirect: true });
    }

    getColorAccordingToStatus(status) {
        switch (status) {
            case 0:
                return "red";
            case 1:
                return "yellow"
            case 2:
                return "yellow";
            case 3:
                return "green";
            default:
                return "gray";
        }
    }

    render() {
        if (!this.props.location.propsSearch || this.state.redirect)
            return <Redirect to="/check" />;
        let english, russian, color, contents, stat;
        if (!this.state.loading) {
            if (this.state.id !== this.state.collection.length) {
                english = this.state.collection[this.state.id].card.eN_Name;
                russian = this.state.collection[this.state.id].card.rU_Name;
                stat = this.state.collection[this.state.id].status;
                color = this.getColorAccordingToStatus(stat);
            }
            contents = (<>
                { this.state.id != this.state.collection.length ? <div className="card right"></div> : <></>}
                { this.state.id != 0 ? <div className="card left"></div> : <></>}
                {
                    this.state.id !== this.state.collection.length ?
                        this.state.collection[this.state.id].testType == "common" ?
                            <CommonCardTest key={this.state.id} english={english} russian={russian} color={" " + color} correct={this.correct} incorrect={this.incorrect} />
                            : this.state.collection[this.state.id].testType == "inverse" ?
                                <CommonCardTest key={this.state.id} english={russian} russian={english} color={" " + color} correct={this.correct} incorrect={this.incorrect} />
                                : <InputCardTest key={this.state.id} english={english} russian={russian} color={" " + color} correct={this.correct} incorrect={this.incorrect} />
                        : <Finish key={this.state.id} method={this.confirm} correct={this.state.numberСorrectWords} total={this.state.collection.length} />
                }
            </>);
        } else {
            contents = <Loader/>;
        }
        return (<div className="card-box">
            {contents}
        </div>
        );
    }
}

class CommonCardTest extends Component {
    constructor(props) {
        super(props);
        this.changeButtons1 = this.changeButtons1.bind(this);
        this.changeButtons2 = this.changeButtons2.bind(this);

        this.correctAnswer = this.correctAnswer.bind(this);
        this.incorrectAnswer = this.incorrectAnswer.bind(this);
    }
    changeButtons1() {
        document.getElementById('b1').textContent = "Так и знал";
        document.getElementById('b2').textContent = "Ошибся";

        document.getElementById('flipInside').classList.toggle('hover');

        this.moveFlipToCenter(600);
    }
    changeButtons2() {
        document.getElementById('b1').textContent = "Вспомнил";
        document.getElementById('b2').textContent = "Запомню";

        document.getElementById('flipInside').classList.toggle('hover');

        this.moveFlipToCenter(600);
    }

    componentDidMount() {
        setTimeout(() => {
            document.getElementById("flipOutside").classList.toggle('hover');
        }, 100);
    }

    correctAnswer() {
        document.getElementById("flipOutside").classList.toggle('hover');
        this.moveFlipLeft(600, this.props.correct);
    }

    incorrectAnswer() {
        document.getElementById("flipOutside").classList.toggle('hover');
        this.moveFlipLeft(600, this.props.incorrect);
    }

    moveFlipLeft(duration, callback) {
        let oneStepInMs = 60;

        let width = 300;
        let cardBoxWidth = 1000;
        let rightPos = (cardBoxWidth - width) / 2;
        let to = cardBoxWidth - width;
        let increment = (to - rightPos) * oneStepInMs / duration;

        clearInterval(this.id);

        this.id = setInterval(() => {
            rightPos += increment;
            document.getElementById("flipOutside").style.right = rightPos + "px";
            if (rightPos == to) {
                document.getElementById("flipOutside").style.right = to + "px";
                setTimeout(callback, 600);
                clearInterval(this.id);
            }
        }, oneStepInMs)
    }

    moveFlipToCenter(duration) {
        let oneStepInMs = 60;

        let rightPos = 0;
        let width = 300;
        let cardBoxWidth = 1000;
        let to = (cardBoxWidth - width) / 2;
        let increment = (to - rightPos) * oneStepInMs / duration;

        clearInterval(this.id);

        let id = setInterval(() => {
            rightPos += increment;
            document.getElementById("flipOutside").style.right = rightPos + "px";
            if (rightPos == to) {
                document.getElementById("flipOutside").style.right = to + "px";
                clearInterval(id);
            }
        }, oneStepInMs)
    }

    render() {
        return (
            <div id={"f" + this.props.key} id="flipOutside" className="flip-container">
                <div className="flipper">
                    <div className="front card"></div>
                    <div className="back">
                        <div id={"flipInside"} className="flip-container">
                            <div className="flipper">
                                <div className="back">
                                    <div className={"card " + this.props.color}>
                                        <p>{this.props.english}</p>
                                        <div className="answer">
                                            <a className="all-button answer-button" onClick={this.changeButtons1}>Знаю</a>
                                            <a className="all-button answer-button" onClick={this.changeButtons2}>Не знаю</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="front">
                                    <div className={"card " + this.props.color}>
                                        <p>{this.props.russian}</p>
                                        <div className="answer">
                                            <a id="b1" className="all-button answer-button" onClick={this.correctAnswer}></a>
                                            <a id="b2" className="all-button answer-button" onClick={this.incorrectAnswer}></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class InputCardTest extends Component {
    constructor(props) {
        super(props);
        this.state = { translation: "" }

        this.handleInput = this.handleInput.bind(this);
        this.changeTranslation = this.changeTranslation.bind(this);
    }

    handleInput() {
        let isCorrect = this.state.translation.toLowerCase() == this.props.russian.toLowerCase();
        if (isCorrect) {
            document.getElementById("res").classList.toggle("correct");
            document.getElementById('res').textContent = "Верно!";
        } else {
            document.getElementById("res").classList.toggle("wrong");
            document.getElementById('res').textContent = "Неверно!";
        }
        document.getElementById('flipInside').classList.toggle('hover');

        setTimeout(() => this.moveFlipLeft(600, () => {
            document.getElementById('flipOutside').classList.toggle('hover');
            setTimeout(() => isCorrect ? this.props.correct() : this.props.incorrect(), 600);
        }), 600);
    }

    componentDidMount() {
        setTimeout(() => {
            document.getElementById("flipOutside").classList.toggle('hover');
        }, 100);
        this.moveFlipToCenter(600);
    }

    moveFlipLeft(duration, callback) {
        let oneStepInMs = 60;

        let width = 300;
        let cardBoxWidth = 1000;
        let rightPos = (cardBoxWidth - width) / 2;
        let to = cardBoxWidth - width;
        let increment = (to - rightPos) * oneStepInMs / duration;

        clearInterval(this.id);

        this.id = setInterval(() => {
            rightPos += increment;
            document.getElementById("flipOutside").style.right = rightPos + "px";
            if (rightPos == to) {
                document.getElementById("flipOutside").style.right = to + "px";
                setTimeout(callback, 600);
                clearInterval(this.id);
            }
        }, oneStepInMs)
    }

    moveFlipToCenter(duration) {
        let oneStepInMs = 60;

        let rightPos = 0;
        let width = 300;
        let cardBoxWidth = 1000;
        let to = (cardBoxWidth - width) / 2;
        let increment = (to - rightPos) * oneStepInMs / duration;

        clearInterval(this.id);

        let id = setInterval(() => {
            rightPos += increment;
            document.getElementById("flipOutside").style.right = rightPos + "px";
            if (rightPos == to) {
                document.getElementById("flipOutside").style.right = to + "px";
                clearInterval(id);
            }
        }, oneStepInMs)
    }

    changeTranslation(elem) {
        this.setState({ translation: elem.value });
    }

    render() {
        return (
            <div id={"f" + this.props.key} id="flipOutside" className="flip-container">
                <div className="flipper">
                    <div className="front card"></div>
                    <div className="back">
                        <div id={"flipInside"} className="flip-container">
                            <div className="flipper">
                                <div className="back">
                                    <div className={"card " + this.props.color}>
                                        <p>{this.props.english}</p>
                                        <label htmlFor="translation">
                                            <p>Перевод:</p>
                                            <input type="text" autoComplete="off" name="translation" id="translation" placeholder="На русском" value={this.state.translation} onChange={(e) => this.changeTranslation(e.target)} />
                                        </label>
                                        <a className="all-button answer-button" onClick={this.handleInput}>Проверить</a>
                                    </div>
                                </div>
                                <div className="front">
                                    <div className={"card " + this.props.color}>
                                        <p>{this.props.russian}</p>
                                        <p id="res"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Finish extends Component {
    moveFlipToCenter(duration) {
        let oneStepInMs = 60;

        let rightPos = 0;
        let width = 300;
        let cardBoxWidth = 1000;
        let to = (cardBoxWidth - width) / 2;
        let increment = (to - rightPos) * oneStepInMs / duration;
        clearInterval(this.id);

        let id = setInterval(() => {
            rightPos += increment;
            document.getElementById("flipOutside").style.right = rightPos + "px";

            if (rightPos == to) {
                document.getElementById("flipOutside").style.right = to + "px";
                clearInterval(id);
            }
        }, oneStepInMs)
    }

    componentDidMount() {
        this.moveFlipToCenter(600);
        setTimeout(() => {
            document.getElementById("flipOutside").classList.toggle('hover');
        }, 100);
    }

    render() {
        return (
            <div id={"f" + this.props.key} id="flipOutside" className="flip-container">
                <div className="flipper">
                    <div className="front card white"></div>
                    <div className="back">
                        <div id={"flipInside"} className="flip-container">
                            <div className="flipper">
                                <div className="back">
                                    <div className="card">
                                        <p>{this.props.correct} из {this.props.total}</p>
                                        <div className="answer">
                                            <a className="all-button answer-button" onClick={this.props.method} to='/check'>К другим наборам</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="front">
                                    <div className="card">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}