import React, { Component } from 'react';
import "./CheckCard.css"
import { Link, Redirect } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'

export class CheckCard extends Component {
    constructor(props) {
        super(props);

        this.correct = this.correct.bind(this);
        this.confirm = this.confirm.bind(this);
        this.incorrect = this.incorrect.bind(this);

        this.state = { id: 0, numberСorrectWords: 0, collection: [], loading: true };
    }

    cardsCorrect = [];

    componentDidMount() {
        if (this.props.location.propsSearch)
            this.getData();
    }


    correct() {
        this.cardsCorrect.push({ cardId: this.state.collection[this.state.id].card.cardID, isTrue: true });
        this.setState((state) => {

            state.id++;
            state.numberСorrectWords++;
            return state;
        });
    }

    incorrect() {
        this.cardsCorrect.push({ cardId: this.state.collection[this.state.id].card.cardID, isTrue: false });
        this.setState((state) => {
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
        this.setState({ collection: data, loading: false });

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
    }

    // TODO: вообще прикольно было бы сделать анимацию передвижения карточек
    render() {
        if (!this.props.location.propsSearch)
            return <Redirect to="/check" />;
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            :
            this.state.id !== this.state.collection.length ?
                <CommonCardTest key={this.state.id} english={this.state.collection[this.state.id].card.eN_Name} russian={this.state.collection[this.state.id].card.rU_Name} correct={this.correct} incorrect={this.incorrect} />
                :
                <Finish correct={this.state.numberСorrectWords} method={this.confirm} total={this.state.collection.length} />


        return (<div className="card-box">
            {contents}
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
                            <Link className="all-button answer-button" onClick={this.props.method} to='/check'>К другим наборам</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}