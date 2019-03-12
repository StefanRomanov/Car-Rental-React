import React, {Component, Fragment} from 'react';

import './Navigation.css';
import {NavLink} from "react-router-dom";
import {UserConsumer} from "../contexts/UserContext";


const Navigation = (props) => {

    const {user} = props;

    return (
        <header>
            <div className="navbar bg-info shadow">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 justify-content-between">
                            <NavLink to="/" exact className="navbar-brand nav-link"><h3>Rento</h3></NavLink>
                            {user.isLoggedIn ?
                                (
                                    <Fragment>
                                        <NavLink to="/cars/all" className="nav-link">All Cars</NavLink>
                                        {
                                            user.role === 'ADMIN' ? (
                                                    <Fragment>
                                                        <NavLink to="/cars/create" className="nav-link">Create Car</NavLink>
                                                        <NavLink to="/rents/pending" className="nav-link">Pending
                                                            Rents</NavLink>
                                                        <NavLink to="/rents/active" className="nav-link">Active
                                                            Rents</NavLink>
                                                    </Fragment>
                                                )
                                                : (<Fragment>
                                                        <NavLink to="/purchases" className="nav-link">Purchases</NavLink>
                                                        <NavLink to="/cars/available" className="nav-link">Available Cars</NavLink>
                                                    </Fragment>
                                                )
                                        }
                                        <NavLink to="/logout" className="nav-link">Logout</NavLink>
                                    </Fragment>
                                )
                                : (
                                    <Fragment>
                                        <NavLink to="/cars/all" className="nav-link">All Cars</NavLink>
                                        <NavLink to="/login" className="nav-link">Login</NavLink>
                                        <NavLink to="/register" className="nav-link">Register</NavLink>
                                        <NavLink to="/cars/available" className="nav-link">Available Cars</NavLink>
                                    </Fragment>
                                )

                            }


                            <span className="font-weight-bold">Hello, {user.username}!</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

const NavigationWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({user}) => (
                    <Navigation {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};

export default NavigationWithContext;