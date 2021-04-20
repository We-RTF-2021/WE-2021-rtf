import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import "./NewCollection.css"

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
            state.ids.splice(id,1);
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
            <>
                <h1>Добавление набора карточек</h1>
                
                <label htmlFor="Name">
                    Название набора
                <input type="text" className="inp" name="Name" id="Name" placeholder="Например, 30 самых важных слов" />
                </label>
                <br/>

                <label htmlFor="Description">
                    Описание <br />
                    <textarea name="Description" className="txtar" id="Description" placeholder="Замотивируйте людей изучить ваш набор слов"></textarea>
                </label>

                {this.state.ids.map((item, index) => index === this.state.ids.length - 1 ?
                    (<Fragment key={index}>
                        <input type="text" className="left-russian" id={"r" + index} placeholder="Слово на русском" currentValue="" />
                        <input type="text" id={"e" + index} className="right-english" placeholder="Перевод на английском" currentValue={item.english} />
                        <a id={"b" + index} className="button plus-minus" onClick={this.addWord}>Добавить</a>
                    </Fragment>)
                        :
                    (<Fragment key={index}>
                        <input type="text" className="left-russian" id={"r" + index} placeholder="Слово на русском" />
                        <input type="text" id={"e" + index} className="right-english" placeholder="Перевод на английском" />
                        <a id={"b" + index} className="button plus-minus" onClick={(e) => { theComponent.deleteWord(e.currentTarget.id); }} >Удалить</a>
                    </Fragment>)
                )}
                <br/>
                <a id="confirmButton" className="button plus-minus">Готово</a>
            </>
        );
    }
}