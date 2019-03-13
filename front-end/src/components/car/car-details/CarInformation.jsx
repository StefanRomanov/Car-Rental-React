import React, {Fragment} from 'react';
import {withRouter} from "react-router";
import {DatesConsumer} from "../../../context/DatesContext";
import util from "../../../services/util";

const CarInformation = (props) => {

    const {startDate, endDate} = props.dates;

    const days = util.getDaysBetween(new Date(startDate), new Date(endDate));

    return <div className="container clearfix col-lg-9 m-5 align-self-center">
        <div className="row">
            <div className="col-md app-bg-fourth rounded shadow">
                <div className="m-3">
                    <h1>{props.data.brand} {props.data.model}</h1>
                    <h3>Year: {props.data.year}</h3>
                    {
                        props.location.pathname.startsWith('/cars/reserve')  ? (
                            <Fragment>
                                <br/>
                                <h2>Rent Information</h2>
                                <hr/>
                                <h4>
                                    Start date
                                </h4>
                                <div>{startDate}</div>
                                <h4>
                                    End date
                                </h4>
                                <div>{endDate}</div>
                                <h4>
                                    Total price
                                </h4>
                                <div>${days * props.data.pricePerDay}</div>
                            </Fragment>
                            ) : (
                            <Fragment>
                                <h2>Description</h2>
                                < pre className="text-wrap pre-scrollable">
                                        {props.data.description}
                                </pre>
                                <h2>Price per day</h2>
                                <div>{props.data.pricePerDay}</div>
                            </Fragment>
                        )
                    }
                </div>

            </div>
            <div className="col-md-6">
                <div className="col-lg-10">
                    <div className="align-self-center m-3">
                        <img className="img-responsive details-image img-thumbnail"
                             src={props.data.imageUrl}
                             alt=""/>
                    </div>
                    <div className="col-md-12 app-bg-fourth table-responsive rounded shadow">
                        <h2 className="font-weight-bold">Technical data</h2>
                        <table className="m-3 align-self-center">
                            <tbody>
                            <tr>
                                <td className="font-weight-bold">Make</td>
                                <td>{props.data.brand}</td>
                                <td className="font-weight-bold">Seats</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Model</td>
                                <td>{props.data.model}</td>
                                <td className="font-weight-bold">Fuel expense</td>
                                <td>{props.data.litersPerHundredKilometers} l/100
                                    km
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Fuel type</td>
                                <td>Gasoline</td>
                                <td className="font-weight-bold">Trunk capacity</td>
                                <td>
                                    <span><span>281</span> l</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Year</td>
                                <td>2016</td>
                                <td className="font-weight-bold">Doors</td>
                                <td>5</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

const CarInformationWithContext = (props) => {

    return (
        <DatesConsumer>
            {
                ({dates}) =>(
                    <CarInformation {...props} dates={dates} />
                )
            }
        </DatesConsumer>
    )

};

export default withRouter(CarInformationWithContext)