import React from 'react';
import Table from 'react-bootstrap/Table';
import { FormattedMessage } from 'react-intl';
import Detail from './Detail.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormattedDate } from 'react-intl';
import { FormattedNumber } from "react-intl";
import {FormattedPlural} from 'react-intl';


export default class Peliculas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasEs: [],
            peliculasEn: [],
            detail: false,
            id: ''
        }
    }

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('peliculasEs') === null)
                this.setState({ peliculasEs: "loading..." })
            else
                this.setState({ peliculasEs: JSON.parse(localStorage.getItem('peliculasEs')) });
        }

        if (!navigator.onLine) {
            if (localStorage.getItem('peliculasEn') === null)
                this.setState({ peliculasEn: "loading..." })
            else
                this.setState({ peliculasEn: JSON.parse(localStorage.getItem('peliculasEn')) });
        }

        fetch("https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json")
            .then(res => {
                return res.json();
            }).then(res => {
                this.setState({ peliculasEs: res });
                localStorage.setItem('peliculasEs', JSON.stringify(res));
            });

        fetch("https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json")
            .then(res => {
                return res.json();
            }).then(res => {
                console.log(res)
                this.setState({ peliculasEn: res });
                localStorage.setItem('peliculasEn', JSON.stringify(res));
            });
    }

    handleClick(id) {
        this.setState({ detail: true, id: id })
    }

    Table() {
        // this.setState(
        //     this.state.peliculasEs.map((pelicula) =>
        //         <li>{pelicula}</li>
        //     )
        // )

        let items = []
        console.log(navigator.language)
        if (navigator.language === "en-US") {

            items = this.state.peliculasEn.map((item, key) =>
                <tr onClick={() => this.handleClick(item.id)}>
                    <td>{item.name}</td>
                    <td>{item.directedBy}</td>
                    <td>{item.country}</td>
                    <td>
                        <FormattedPlural 
                        value = {item.budget}
                        one = "Million"
                        other ="Millions"
                        />
                        {item.budget}
                    </td>
                    <td>
                        <FormattedDate
                            value={new Date(item.releaseDate)}
                            year='numeric'
                            month='long'
                            day='numeric'
                            weekday='long'
                        />
                    </td>
                    <td>
                        <FormattedNumber
                            value={item.views}
                        />
                    </td>
                </tr>
            );
        }
        else {
            items = this.state.peliculasEs.map((item, key) =>
                <tr onClick={() => this.handleClick(item.id)}>
                    <td>{item.name}</td>
                    <td>{item.directedBy}</td>
                    <td>{item.country}</td>
                    <td>
                        <FormattedPlural 
                        value = {item.budget}
                        one = "Millón"
                        other ="Millones"
                        />
                        {item.budget}
                    </td>
                    <td>
                        <FormattedDate
                            value={new Date(item.releaseDate)}
                            year='numeric'
                            month='long'
                            day='numeric'
                            weekday='long'
                        />
                    </td>
                    <td>
                        <FormattedNumber
                            value={item.views}
                        />
                    </td>
                </tr>
            );
        }


        // <li key={item.id}>{item.name}</li>


        return (<tbody>{items}</tbody>)
    }

    Show() {
        if (this.state.detail) {
            return <Detail id={this.state.id} />
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id="name" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="directedBy" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="country" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="budget" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="releaseDate" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="views" />
                                    </th>
                                </tr>
                            </thead>
                            {this.Table()}
                        </Table>
                    </Col>
                    <Col>
                        {this.Show()}
                    </Col>
                </Row>
            </div>
        )
    }

}
