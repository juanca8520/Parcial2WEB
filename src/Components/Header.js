import React from 'react';
import { FormattedMessage } from 'react-intl';
import Navbar from 'react-bootstrap/Navbar'

export default class Header extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <FormattedMessage id="movies" />

                </Navbar.Brand>
            </Navbar>
        )
    }
}