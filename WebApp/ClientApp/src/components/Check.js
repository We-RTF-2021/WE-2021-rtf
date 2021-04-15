import React, { Component } from 'react';
// import './Check.css';
import "./Check.css"

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
            let grad = `linear-gradient(to right, green ${0}%, yellow ${e.progress.know + 5}%, red ${e.progress.know + e.progress.study + 5}%)`
            result.push(
                <div className="collection">
                    <p>{e.name}</p>
                    <p>Слов {e.countWord}</p>
                    <div className="progress" style={{ background: grad }}></div>
                    <input type="button" className="button" value="Повторить" onClick={() => alert("«Отправлено»")} />
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