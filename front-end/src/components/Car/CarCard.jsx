import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {UserConsumer} from "../contexts/UserContext";


const CarCard = (props) => {

    const {user} = props;

    return (
        <div className="card shadow rounded-lg">
            <div className="card-horizontal">
                <div className="card-image m-3">
                    <img className="card-image" src={props.car.imageUrl} alt=""/>
                </div>
                <div className="card-body">
                    <div className="card-columns">
                        <h2>{props.car.brand}</h2>
                        <h2>{props.car.model}</h2>
                        <h5>Price per day: {props.car.pricePerDay} lv</h5>
                        <h5>Trunk capacity: {props.car.trunkCapacity} l</h5>
                        <h5>Doors: {props.car.seats}</h5>
                        <h5>Fuel expense: {props.car.litersPerHundredKilometers} l/km</h5>
                    </div>
                </div>
                <div className="card-footer col-lg-2">
                    <div className="row my-3 justify-content-around">
                        <Link className="btn btn-info col-lg-6"
                              to={"/cars/details/" + props.car.id}>Details</Link>
                        {
                            user.role === 'USER' && (<Link className="btn btn-primary col-lg-6"
                                                           to={"/cars/reserve/" + props.car.id}>Reserve</Link>)
                        }

                    </div>
                    <div className="row my-3">
                        {
                            user.role === 'ADMIN' && (
                                <Fragment>
                                    <Link className="btn btn-warning col-lg-6"
                                          to={"/cars/edit/" + props.car.id}>Edit</Link>
                                    <Link className="btn btn-danger col-lg-6"
                                          to={"/cars/delete/" + props.car.id}>Delete</Link>
                                </Fragment>
                                )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

const CarCardWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({user}) => (
                    <CarCard {...props} user={user} />
                )
            }
        </UserConsumer>
    )
};

export default CarCardWithContext;