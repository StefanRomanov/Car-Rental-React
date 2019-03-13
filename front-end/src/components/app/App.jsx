import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import decode from "jwt-decode";
import './App.css';

import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import Navigation from "../common/Navigation";
import Home from "../home/Home";
import Footer from "../common/Footer";
import RentsActive from '../rent/RentsActive'
import RentsPending from "../rent/RentsPending";
import Cars from "../car/Cars";
import CreateCar from "../car/car-forms/CreateCar";
import AllReceipts from "../receipt/AllReceipts";
import NotFound from "../common/NotFound";
import CarEdit from "../car/car-forms/CarEdit";
import CarDelete from "../car/car-forms/CarDelete";
import CarDetails from "../car/car-details/CarDetails";
import ReserveCar from "../car/ReserveCar";
import Logout from "../common/Logout";
import {UserProvider, defaultUserState} from "../../context/UserContext";
import {DatesProvider, defaultDateState} from "../../context/DatesContext";
import PrivateRoute from "../common/PrivateRoute";
import RentSearch from "../car/car-forms/CarsAvailable";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.constructContext(),
            dates: defaultDateState
        }
    }

    constructContext() {

        const token = window.localStorage.getItem("auth_token");

        if (token && token.length > 0) {
            try {
                const decoded = decode(token);
                return {
                    username: decoded.sub,
                    role: decoded.role,
                    isLoggedIn: true
                };

            } catch (e) {
                console.log(e);
            }
        }

        return defaultUserState;
    }

    updateUser = (user) => {
        this.setState({user});
    };

    updateDates = (dates) => {
        this.setState({dates});
    };


    render() {
        const {user,dates} = this.state;


        return (
            <div className="container-fluid app">
                <BrowserRouter>
                    <Fragment>
                        <UserProvider value={{user, updateUser: this.updateUser}}>
                            <DatesProvider value={{dates, updateDates: this.updateDates}}>
                                <Navigation logout={this.logout}/>
                                <Switch>
                                    <Route exact path={"/"} component={Home}/>
                                    <Route exact path="/register" component={RegisterForm}/>
                                    <Route exact path="/login" component={LoginForm}/>
                                    <PrivateRoute allowedRoles={['ADMIN', 'USER']} exact path="/logout"
                                                  component={Logout}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/rents/active"
                                                  component={RentsActive}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/rents/pending"
                                                  component={RentsPending}/>
                                    <Route exact path="/cars/all" component={Cars}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/create"
                                                  component={CreateCar}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/edit/:id"
                                                  component={CarEdit}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/delete/:id"
                                                  component={CarDelete}/>
                                    <Route exact path="/cars/details/:id" component={CarDetails}/>
                                    <PrivateRoute allowedRoles={['USER']} exact path="/purchases"
                                                  component={AllReceipts}/>
                                    <Route exact path="/cars/available" component={RentSearch}/>
                                    <PrivateRoute allowedRoles={['USER']} exact path="/cars/reserve/:id"
                                                  component={ReserveCar}/>
                                    <Route component={NotFound}/>
                                </Switch>
                                <Footer/>
                            </DatesProvider>
                        </UserProvider>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
