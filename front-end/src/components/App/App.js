import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';

import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import {BrowserRouter} from "react-router-dom";
import RentsApproved from '../Rent/RentsApproved'
import RentsPending from "../Rent/RentsPending";
import Cars from "../Car/Cars";
import CreateCar from "../Car/CarForms/CreateCar";
import AllReceipts from "../Receipt/AllReceipts";
import NotFound from "../Generic/NotFound";
import {Redirect} from "react-router";
import CarEdit from "../Car/CarForms/CarEdit";
import CarDelete from "../Car/CarForms/CarDelete";
import CarDetails from "../Car/CarDetails/CarDetails";
import ReserveCar from "../Rent/ReserveCar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    logout(e){
        e.preventDefault();
        window.localStorage.clear();

        return <Redirect to="/login"/>
    }

    render() {
        return (
            <div className="container-fluid">
                <BrowserRouter>
                    <Fragment>
                        <Navigation logout={this.logout}/>
                        <Switch>
                            <Route exact path={"/"} component={Home}/>
                            <Route exact path="/register" component={RegisterForm}/>
                            <Route exact path="/login" component={LoginForm}/>
                            <Route exact path="/rents/active" component={RentsApproved}/>
                            <Route exact path="/rents/pending" component={RentsPending}/>
                            <Route exact path="/cars/all" component={Cars}/>
                            <Route exact path="/cars/create" component={CreateCar}/>
                            <Route exact path="/cars/edit/:id" component={CarEdit}/>
                            <Route exact path="/cars/delete/:id" component={CarDelete}/>
                            <Route exact path="/cars/details/:id" component={CarDetails}/>
                            <Route exact path="/register" component={RegisterForm}/>
                            <Route exact path="/purchases" component={AllReceipts}/>
                            <Route exact path="/cars/reserve/:id" component={ReserveCar}/>
                            <Route component={NotFound}/>
                        </Switch>
                        <Footer/>
                    </Fragment>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
