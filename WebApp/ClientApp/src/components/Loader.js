import React, { Component } from 'react';
import "./Loader.css";

export class Loader extends Component {
    static displayName = Loader.name;
    constructor(props) {
        super(props);
        this.state = { scales: [1, 2, 3, 4, 5] };
    }

    componentDidMount() {
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                let index = i;
                setTimeout(() => document.getElementById("scale" + index)?.classList.toggle("scaleAnim"), index * 250);
            }
        }, 100);
    }
    render() {
        return (
            <div className="loaderContainer">
                <div className="scaleContainer">
                    {this.state.scales.map((value, index) => <div id={"scale" + index} className="scale" />)}
                </div>
            </div>
        );
    }
}
