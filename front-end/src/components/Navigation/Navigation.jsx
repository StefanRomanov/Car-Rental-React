import React, {Component} from 'react';

import NavLink from "react-router-dom/es/NavLink";
import './Navigation.css';


class Navigation extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <header>
                <div className="navbar bg-info shadow">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 justify-content-between">
                                <NavLink to="/" exact className="navbar-brand nav-link"><h3>Rento</h3></NavLink>
                                <NavLink to="/cars/all" className="nav-link">All Cars</NavLink>
                                <NavLink to="/cars/create" className="nav-link">Create Car</NavLink>
                                <NavLink to="/rents/pending" className="nav-link">Pending Rents</NavLink>
                                <NavLink to="/rents/active" className="nav-link">Active Rents</NavLink>
                                <NavLink to="/purchases" className="nav-link">Purchases</NavLink>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                                <NavLink to="#" onClick={this.props.logout} className="nav-link">Logout</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

}

export default Navigation;