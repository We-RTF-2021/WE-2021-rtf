import React, { Component, Fragment } from 'react';
import "./NewCollection.css";
import { NavLink } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService';

export class NewCollection extends Component {
    static displayName = NewCollection.name;
    constructor(props) {
        super(props);

        this.addWord = this.addWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);

        this.state = {
            nameOfSet: "",
            ids: [{
                russian: "",
                english: ""
            }]
        }
    }



    deleteWord(bId) {
        // console.log(bId);
        // let id = parseInt(bId.substring(1));
        // console.log(id);
        this.setState((state) => {
            state.ids.pop();
            return state;
            // state.ids.splice(id, 1);
            // return state;
        });
    }
    addWord(e) {
        if (!this.state.ids[this.state.ids.length - 1].russian || !this.state.ids[this.state.ids.length - 1].english) {

            return;
        }
        e.preventDefault();
        this.setState((state) => {
            state.ids.push({
                russian: "",
                english: ""
            });
            return state;
        });

    }

    handleChange(event) {
        this.setState({ nameOfSet: event.target.value })
    }

    wordChange(id, field, event) {
        this.setState(state => {
            return {
                ids: state.ids.map((e, index) => index === id ? { ...e, [field]: event.target.value } : e)
            }
        })
    }



    async postForm() {
        let set = this.state;
        const token = await authService.getAccessToken();
        let f = !token ? {
            'Content-Type': 'application/json; charset=UTF-8'
        } : {
            'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json; charset=UTF-8'
        };
        let c = JSON.stringify(set);
        let response = await fetch('set', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(set)
        });
    }

    render() {
        let theComponent = this;
        return (
            <div className="newCollection-box">
                <h2>Добавление набора карточек</h2>
                {/* <h1>{this.props.sid}</h1> */}
                <label htmlFor="Cards">
                    Название набора
                <input type="text" className="inp" name="Cards" id="Cards" onChange={this.handleChange.bind(this)} value={this.state.nameOfSet} placeholder={this.nameOfSet || "Например, 30 самых важных слов"} />
                </label>
                <label htmlFor="Description">
                    Описание
                    <textarea name="Description" className="txtar" id="Description" placeholder="Замотивируйте людей изучить ваш набор слов"></textarea>
                </label>

                {this.state.ids.map((item, index) => index === this.state.ids.length - 1 ?
                    (<Fragment key={index}>
                        <div className="newWord">
                            <input type="text" className="left-russian" id={"r" + index} onChange={this.wordChange.bind(this, index, 'russian')} value={this.state.ids.russian} placeholder="Слово на русском" />
                            <input type="text" id={"e" + index} className="right-english" onChange={this.wordChange.bind(this, index, 'english')} value={this.state.ids.english} placeholder="Перевод на английском" />
                            <a id={"b" + index} className="all-button plus-minus" onClick={this.addWord}>Добавить</a>
                        </div>
                    </Fragment>)
                    :
                    (<Fragment key={index}>
                        <div className="newWord">
                            <input type="text" className="left-russian" id={"r" + index} onChange={this.wordChange.bind(this, index, 'russian')} value={this.state.ids.russian} placeholder="Слово на русском" />
                            <input type="text" id={"e" + index} className="right-english" onChange={this.wordChange.bind(this, index, 'english')} value={this.state.ids.english} placeholder="Перевод на английском" />
                            <a id={"b" + index} className="all-button plus-minus" onClick={(e) => { theComponent.deleteWord(e.currentTarget.id); }} >Удалить</a>
                        </div>
                    </Fragment>)
                )}
                <br />
                <NavLink id="confirmButton" onClick={this.postForm.bind(this)} to="/" className="all-button plus-minus"><b>Готово</b></NavLink>
            </div>
        );
    }
}