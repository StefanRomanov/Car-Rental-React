import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router";
import {Link} from "react-router-dom";
import toastr from "toastr";

import {rentService, carService} from '../../../services'
import CarInformation from "./CarInformation";
import {DatesConsumer} from "../../../context/DatesContext";
import {UserConsumer} from "../../../context/UserContext";



class ReserveCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            id: '',
            brand: '',
            model: '',
            power: '',
            color: '',
            description: '',
            imageUrl: '',
            litersPerHundredKilometers: '',
            pricePerDay: ''
        };

        this.onClick = this.onClick.bind(this);
    }


    onClick() {
        const {startDate, endDate} = this.props.dates;
        const {username} = this.props.user;

        console.log(username);

        rentService.reserve(this.state.id, {startDate,endDate,username})
            .then(res => {
                this.setState({
                    submitted: true
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        carService.getCarById(id)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                    this.props.history.push("/cars/all")
                } else {
                    this.setState({
                        ...res
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to="/cars/all"/>
        }

        return (
            <div className='container col-lg-11'>
                <div className='row justify-content-center'>
                    <CarInformation data={this.state}/>
                </div>
                <hr/>
                <div className="row justify-content-center my-3">
                    <button className="btn btn-info mx-3 text-white w-15"
                         onClick={this.onClick}>Reserve</button>
                    <Link to="/cars/all" className="btn btn-danger mx-3 text-white w-15">Cancel</Link>
                </div>
            </div>
        )
    }

}

const ReserveCarWithContext = (props) => {

    return (
            <DatesConsumer>
                {
                    ({dates}) =>(
                        <ReserveCar {...props} dates={dates} />
                    )
                }
            </DatesConsumer>
    )
};

const ReserveCarWithBothContexts = (props) => {
    return (
        <UserConsumer>
            {
                ({user}) =>(
                    <ReserveCarWithContext {...props} user={user} />
                )
            }
        </UserConsumer>
    )
};

export default withRouter(ReserveCarWithBothContexts);