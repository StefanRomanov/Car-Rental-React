import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import toastr from 'toastr';
import {withRouter} from "react-router";

import {carService} from '../../../services'
import CarInformation from "./CarInformation";
import {UserConsumer} from "../../../context/UserContext";
import CarCheckForm from "../car-forms/CarCheckAvailability";


class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            brand: '',
            model: '',
            count: '',
            trunkCapacity: '',
            doors: '',
            description: '',
            imageUrl: '',
            litersPerHundredKilometers: '',
            pricePerDay: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        carService.getCarById(id)
            .then(data => {

                if(data.success === false){
                    toastr.error(data.message);
                    this.props.history.push("/cars/all");
                } else {
                    this.setState({
                        ...data
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }


    render() {

        const {user} = this.props;

        return (
            <div className='container col-lg-11 h-75'>
                <div className='row justify-content-center'>
                    {
                        user.role === 'USER' ? (
                            <CarCheckForm id={this.state.id}/>
                        ) : ''
                    }
                    <CarInformation data={this.state}/>
                </div>
                {
                    user.role === 'ADMIN' ? (
                        <Fragment>
                            <hr/>
                            <div className="row justify-content-center my-3">
                                <Link className="btn btn-info mx-3 text-white w-15"
                                      to={"/cars/edit/" + this.state.id}>Edit</Link>
                                <Link className="btn btn-danger mx-3 text-white w-15"
                                      to={"/cars/delete/" + this.state.id}>Delete</Link>
                            </div>
                        </Fragment>
                    ) : ''
                }
            </div>
        )
    }

}


const CarDetailsWithContext = (props) => {

    return (
        <UserConsumer>
            {
                ({user}) => (
                    <CarDetails {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};

export default withRouter(CarDetailsWithContext);