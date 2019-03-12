import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import './App.css';

import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import Navigation from "../common/Navigation";
import Home from "../home/Home";
import Footer from "../footer/Footer";
import RentsActive from '../rent/RentsActive'
import RentsPending from "../rent/RentsPending";
import Cars from "../Car/Cars";
import CreateCar from "../Car/car-forms/CreateCar";
import AllReceipts from "../receipt/AllReceipts";
import NotFound from "../common/NotFound";
import CarEdit from "../Car/car-forms/CarEdit";
import CarDelete from "../Car/car-forms/CarDelete";
import CarDetails from "../Car/car-details/CarDetails";
import ReserveCar from "../rent/ReserveCar";
import Logout from "../common/Logout";
import {UserProvider, defaultState} from "../contexts/UserContext";
import PrivateRoute from "../private-routes/PrivateRoute";
import RentSearch from "../rent/RentSearch";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: defaultState
        }
    }

    updateUser = (user) => {
        this.setState({user});
        console.log(this.state);
    };


    render() {
        const {user} = this.state;

        return (
            <div className="container-fluid app">
                <BrowserRouter>
                    <Fragment>
                        <UserProvider value={{user, updateUser: this.updateUser}}>
                        <Navigation logout={this.logout}/>
                        <Switch>
                            <Route exact path={"/"} component={Home}/>
                            <Route exact path="/register" component={RegisterForm}/>
                            <Route exact path="/login" component={LoginForm}/>
                            <PrivateRoute allowedRoles={['ADMIN', 'USER']} exact path="/logout" component={Logout}/>
                            <PrivateRoute allowedRoles={['ADMIN']} exact path="/rents/active" component={RentsActive}/>
                            <PrivateRoute allowedRoles={['ADMIN']} exact path="/rents/pending" component={RentsPending}/>
                            <Route exact path="/cars/all" component={Cars}/>
                            <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/create" component={CreateCar}/>
                            <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/edit/:id" component={CarEdit}/>
                            <PrivateRoute allowedRoles={['ADMIN']} exact path="/cars/delete/:id" component={CarDelete}/>
                            <Route exact path="/cars/details/:id" component={CarDetails}/>
                            <PrivateRoute allowedRoles={['USER']} exact path="/purchases" component={AllReceipts}/>
                            <Route exact path="/cars/available" component={RentSearch}/>
                            <PrivateRoute allowedRoles={['USER']} exact path="/cars/reserve/:id" component={ReserveCar}/>
                            <Route component={NotFound}/>
                        </Switch>
                        <Footer/>
                    </UserProvider>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
