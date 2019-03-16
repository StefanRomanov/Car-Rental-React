import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import decode from "jwt-decode";


import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import Navigation from "../common/navigation/Navigation";
import Home from "../home/Home";
import Footer from "../common/Footer";
import RentsActive from '../rent/RentsActive'
import RentsPending from "../rent/RentsPending";
import AllCars from "../car/AllCars";
import CreateCar from "../car/car-forms/CreateCar";
import SalesList from "../sale/SalesList";
import NotFound from "../common/NotFound";
import CarEdit from "../car/car-forms/CarEdit";
import CarDelete from "../car/car-forms/CarDelete";
import CarDetails from "../car/car-details/CarDetails";
import ReserveCar from "../car/car-details/ReserveCar";
import Logout from "../common/Logout";
import {UserProvider, defaultUserState} from "../../context/UserContext";
import {DatesProvider, defaultDateState} from "../../context/DatesContext";
import PrivateRoute from "../common/routes/PrivateRoute";
import CarsAvailable from "../car/CarsAvailable";
import GlobalErrorHandler from '../common/GlobalErrorHandler'

import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.constructUserContext(),
            dates: this.constructDatesContext()
        }
    }

    constructUserContext() {
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

    constructDatesContext() {
        if (window.localStorage.getItem('startDate') && window.localStorage.getItem('endDate')) {
            return {
                startDate: window.localStorage.getItem('startDate'),
                endDate: window.localStorage.getItem('endDate')
            }
        }

        return defaultDateState;
    }

    updateUser = (user) => {
        this.setState({user});
    };

    updateDates = (dates) => {
        window.localStorage.setItem('startDate', dates.startDate);
        window.localStorage.setItem('endDate', dates.endDate);
        this.setState({dates});
    };


    render() {
        const {user, dates} = this.state;


        return (
            <div className="container-fluid app">
                <GlobalErrorHandler>
                    <BrowserRouter>
                        <UserProvider value={{user, updateUser: this.updateUser}}>
                            <DatesProvider value={{dates, updateDates: this.updateDates}}>
                                <Navigation/>
                                <Switch>
                                    <Route exact path={"/"} component={Home}/>
                                    <Route exact path="/register" component={RegisterForm}/>
                                    <Route exact path="/login" component={LoginForm}/>
                                    <Route exact path="/cars/details/:id" component={CarDetails}/>
                                    <Route exact path="/cars/all" component={AllCars}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/rents/active"
                                                  component={RentsActive}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/rents/pending"
                                                  component={RentsPending}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/create"
                                                  component={CreateCar}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/edit/:id"
                                                  component={CarEdit}/>
                                    <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/delete/:id"
                                                  component={CarDelete}/>
                                    <PrivateRoute allowedRoles={['USER']} exact path="/cars/available"
                                                  component={CarsAvailable}/>
                                    <PrivateRoute allowedRoles={['USER']} exact path="/cars/reserve/:id"
                                                  component={ReserveCar}/>
                                    <PrivateRoute allowedRoles={['USER']} exact path="/sales/all/:username"
                                                  component={SalesList}/>
                                    <PrivateRoute allowedRoles={['ADMIN', 'USER']} exact path="/logout"
                                                  component={Logout}/>
                                    <Route component={NotFound}/>
                                </Switch>
                                <Footer/>
                            </DatesProvider>
                        </UserProvider>
                    </BrowserRouter>
                </GlobalErrorHandler>
            </div>
        );
    }
}

export default App;
