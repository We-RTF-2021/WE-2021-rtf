import React, { Component, Fragment } from 'react';
import "./NewCollection.css";
import { NavLink } from 'react-router-dom';

export class NewCollection extends Component {
    static displayName = NewCollection.name;
    constructor(props) {
        super(props);

        this.addWord = this.addWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.changeEnglish = this.changeEnglish.bind(this);
        this.changeRussian = this.changeRussian.bind(this);
        this.confirm = this.confirm.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changeSetName = this.changeSetName.bind(this);

        this.state = {
            setName: "",
            description: "",
            ids: [{
                russian: "",
                english: ""
            }]
        }
    }

    deleteWord(bId) {
        console.log(bId);
        this.setState((state) => {
            state.ids.splice(bId, 1);
            return state;
        });
    }
    addWord(e) {
        e.preventDefault();
        this.setState((state) => {
            state.ids.push({
                russian: "",
                english: ""
            });
            return state;
        });
    }

    changeRussian(elem) {
        let id = elem.id.substring(1);
        this.setState((state) => {
            state.ids[id].russian = elem.value;
            return state;
        });
    }
    changeEnglish(elem) {
        let id = elem.id.substring(1);
        this.setState((state) => {
            state.ids[id].english = elem.value;
            return state;
        });
    }

    changeSetName(elem) {
        this.setState({ setName: elem.value });
    }
    changeDesc(elem) {
        this.setState({ description: elem.value });
    }

    confirm() {
        
    }

    render() {
        return (
            <div className="newCollection-box">
                <h2>Добавление набора карточек</h2>
                {/* <h1>{this.props.sid}</h1> */}
                <label htmlFor="Cards">
                    Название набора
                <input type="text" className="inp" name="Cards" id="Cards" placeholder="Например, 30 самых важных слов" value={this.state.setName} onChange={(e) => this.changeSetName(e.target)} />
                </label>
                <label htmlFor="Description">
                    Описание
                    <textarea name="Description" className="txtar" id="Description" placeholder="Замотивируйте людей изучить ваш набор слов" value={this.state.description} onChange={(e) => this.changeDesc(e.target)} ></textarea>
                </label>

                {
                    this.state.ids.map((item, index) => {
                        let id = index + 0;
                        return id === this.state.ids.length - 1 ?
                            (<Fragment key={id}>
                                <div className="newWord">
                                    <input type="text" className="left-russian" id={"r" + id} placeholder="Слово на русском" value={item.russian} onChange={(e) => this.changeRussian(e.target)} />
                                    <input type="text" id={"e" + id} className="right-english" placeholder="Перевод на английском" value={item.english} onChange={(e) => this.changeEnglish(e.target)} />
                                    <a id={"b" + id} className="all-button plus-minus" onClick={this.addWord}>Добавить</a>
                                </div>
                            </Fragment>)
                            :
                            (<Fragment key={id}>
                                <div className="newWord">
                                    <input type="text" className="left-russian" id={"r" + id} placeholder="Слово на русском" value={item.russian} onChange={(e) => this.changeRussian(e.target)}/>
                                    <input type="text" id={"e" + id} className="right-english" placeholder="Перевод на английском" value={item.english} onChange={(e) => this.changeEnglish(e.target)} />
                                    <a id={"b" + id} className="all-button plus-minus" onClick={() => this.deleteWord(id)}>Удалить</a>
                                </div>
                            </Fragment>);
                        }
                    )
                }
                <br />
                <NavLink id="confirmButton" to="/" className="all-button plus-minus" onClick={this.confirm}><b>Готово</b></NavLink>
            </div>
        );
    }
}