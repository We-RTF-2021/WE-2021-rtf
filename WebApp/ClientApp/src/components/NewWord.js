import React, { Component } from 'react';
import './NewWord.css';

export class NewWord extends Component {
    static displayName = NewWord.name;

    render() {
        return (
            <div className="card">
                <div className="word">House</div>
                <div className="answers">
                    <button href="#">Я знаю</button>
                    <button href="#">Я не знаю</button>
                </div>
            </div>

        );
    }
}