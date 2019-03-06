import React, {Component} from 'react';

import NavLink from "react-router-dom/es/NavLink";
import './Navigation.css';


class Navigation extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cars/all">All Cars</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cars/create">Create Car</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rents/pending">Pending Rents</NavLink>
                    </li>
                    <li>
                        <NavLink to="/rents/active">Active Rents</NavLink>
                    </li>
                    <li>
                        <NavLink to="/purchases">Purchases</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li>
                        <a href="#" onClick={this.props.logout}>Logout</a>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Navigation;