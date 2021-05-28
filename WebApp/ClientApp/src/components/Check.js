import React, { Component } from 'react';
import "./Check.css"
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'
import { Loader } from "./Loader.js"

export class Check extends Component {
    static displayName = Check.name;
    constructor(props) {
        super(props);

        this.state = { collection: [], loading: true };
    }

    componentDidMount() {
        this.getData();
    }

    getCollection() {
        const result = [];
        for (const e of this.state.collection) {
            let grad = e.progress[0] === 100 ? 'red' : e.progress[1] === 100 ? 'yellow' : e.progress[2] === 100 ? 'green' :
                `linear-gradient(to right, red 0%, yellow ${e.progress[0]}%, yellow ${e.progress[1] + e.progress[0]}%, green 100%)`;
            result.push(
                <Link className="collection" key={result.length} to={{ pathname: "/checkCard", propsSearch: e.setID }}>
                    <p><b>{e.name}</b></p>
                    <p>{e.countOfCards} слов</p>
                    <div className="progress" style={{ background: grad }}></div>
                </Link>);
        }
        return <div className="collections">{result}</div>;
    }

    async getData() {
        const token = await authService.getAccessToken();
        const id = await authService.getUser();
        const response = await fetch(`set?userId=${id.sub}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ collection: data, loading: false });
    }

    render() {
        let contents = this.state.loading
            ? <Loader />
            : this.getCollection();
        return (
            <div className="collections-box">
                <h2>Мои наборы</h2>
                {contents}
            </div>
        );
    }
}