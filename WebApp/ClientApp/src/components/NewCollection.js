import React, { Component, Fragment } from 'react';
import "./NewCollection.css";
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

export class NewCollection extends Component {
    static displayName = NewCollection.name;
    constructor(props) {
        super(props);

        this.addWord = this.addWord.bind(this);
        this.deleteWord = this.deleteWord.bind(this);

        this.state = {
            ids: [{
                russian: "",
                english: ""
            }]
        }
    }

    deleteWord(bId) {
        console.log(bId);
        let id = parseInt(bId.substring(1));
        console.log(id);
        this.setState((state) => {
            state.ids.splice(id, 1);
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

    render() {
        let theComponent = this;
        return (
            <div className="newCollection-box">
                <h2>Добавление набора карточек</h2>

                <label htmlFor="Name">
                    Название набора
                <input type="text" className="inp" name="Name" id="Name" placeholder="Например, 30 самых важных слов" />
                </label>
                <label htmlFor="Description">
                    Описание
                    <textarea name="Description" className="txtar" id="Description" placeholder="Замотивируйте людей изучить ваш набор слов"></textarea>
                </label>

                {this.state.ids.map((item, index) => index === this.state.ids.length - 1 ?
                    (<Fragment key={index}>
                        <div className="newWord">
                            <input type="text" className="left-russian" id={"r" + index} placeholder="Слово на русском" currentValue="" />
                            <input type="text" id={"e" + index} className="right-english" placeholder="Перевод на английском" currentValue={item.english} />
                            <button id={"b" + index} className="all-button plus-minus" onClick={this.addWord}>Добавить</button>
                        </div>

                    </Fragment>)
                    :
                    (<Fragment key={index}>
                        <div className="newWord">
                            <input type="text" className="left-russian" id={"r" + index} placeholder="Слово на русском" />
                            <input type="text" id={"e" + index} className="right-english" placeholder="Перевод на английском" />
                            <button id={"b" + index} className="all-button plus-minus" onClick={(e) => { theComponent.deleteWord(e.currentTarget.id); }} >Удалить</button>
                        </div>
                    </Fragment>)
                )}
                <br />
                <NavLink tag={Link} id="confirmButton" to="/" className="all-button plus-minus confirmButton"><b>Готово</b></NavLink>
            </div>
        );
    }
}