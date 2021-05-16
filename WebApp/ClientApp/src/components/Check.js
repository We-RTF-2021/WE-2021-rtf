import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import "./Check.css"
import { Link } from 'react-router-dom';
import authService from './api-authorization/AuthorizeService'

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
            let grad = `linear-gradient(to right, green ${e.progress[2]}%, yellow ${(e.progress[2] + (e.progress[2] > 5 ? 5 : 0))}%, yellow ${e.progress[2] + e.progress[1]}%, red ${e.progress[2] + e.progress[1] + 5}%)`
            result.push(
                <div className="collection" key={result.length}>
                    <p><b>{e.name}</b></p>
                    <p>{e.countOfCards} слов</p>
                    <div className="progress" style={{ background: grad }}></div>
                    <Link className="all-button collection-button" to={{ pathname: "/checkCard", propsSearch: e.setID }}>Проверка</Link >
                </div>);
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
            ? <p><em>Loading...</em></p>
            : this.getCollection();
        return (
            <div className="collections-box">
                <h2>Мои наборы</h2>
                {contents}
            </div>
        );
    }
}