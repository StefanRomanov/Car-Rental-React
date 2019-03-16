import React, {Fragment} from 'react';

import {Link, withRouter} from "react-router-dom";
import {UserConsumer} from "../../context/UserContext";
import util from "../../util/util";


const CarCard = (props) => {

    const {user} = props;

    return (
        <div className="card shadow rounded-lg">
            <div className="card-horizontal ">
                <div className="card-image m-3">
                    <img className="card-image" src={props.car.imageUrl} alt=""/>
                </div>
                <div className="card-body table-responsive">
                    <table className='text-lg-center w-75 h-75 my-2 mx-2'>
                        <tbody>
                        <tr>
                            <th>Brand</th>
                            <td>{props.car.brand}</td>
                            <th>Price</th>
                            <td>${props.car.pricePerDay}/day</td>
                            <th>Seats</th>
                            <td>{props.car.seats}</td>
                        </tr>
                        <tr>
                            <th>Model</th>
                            <td>{props.car.model}</td>
                            <th>Luggage</th>
                            <td>{props.car.trunkCapacity} l</td>
                            <th>Consumption</th>
                            <td>{props.car.litersPerHundredKilometers} l/km</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-footer col-lg-2">
                    <div className="row my-3 justify-content-around">
                        <Link className="btn btn-info col-lg-5"
                              to={"/cars/details/" + props.car.id}>Details</Link>
                        {
                            user.role === 'USER' && props.location.pathname === '/cars/available' && (<Link className="btn btn-primary col-lg-5"
                                                           to={"/cars/reserve/" + props.car.id}>Reserve</Link>)
                        }

                    </div>
                    <div className="row my-3 justify-content-around">
                        {
                            user.role === 'ADMIN' && (
                                <Fragment>
                                    <Link className="btn btn-warning col-lg-5"
                                          to={"/cars/edit/" + props.car.id}>Edit</Link>
                                    <Link className="btn btn-danger col-lg-5"
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

export default withRouter(CarCardWithContext);