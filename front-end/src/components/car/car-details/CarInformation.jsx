import React, {Fragment} from 'react';
import {withRouter} from "react-router";

import {DatesConsumer} from "../../../context/DatesContext";
import util from "../../../util/util";


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
                        props.location.pathname.startsWith('/cars/reserve') ? (
                            <Fragment>
                                <br/>
                                <h2>Rent Information</h2>
                                <hr/>
                                <div className='table-responsive h-75'>
                                    <table className="m-3 align-self-center">
                                        <tbody>
                                        <tr>
                                            <td className="font-weight-bold">Start date</td>
                                            <td>{util.formatDate(startDate)}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">End date</td>
                                            <td>{util.formatDate(endDate)}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Total price</td>
                                            <td>${days * props.data.pricePerDay}*
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <small className='mt-5 ml-3'>* For every day after the return date, you will be charged double
                                        the daily price.
                                    </small>
                                </div>
                            </Fragment>
                        ) : (
                            <div className=''>
                                <hr/>
                                <pre>
                                        <p>{props.data.description}</p>
                                </pre>
                                <hr/>
                                <div className='float-right ml-3'>
                                    <h5>Price: ${props.data.pricePerDay}/Day</h5>
                                </div>

                            </div>
                        )
                    }
                </div>

            </div>
            <div className="col-md-6">
                <div className="col-lg-9">
                    <div className="align-self-center m-3">
                        <img className="img-responsive details-image img-thumbnail"
                             src={props.data.imageUrl}
                             alt=""/>
                    </div>
                    <div className="container app-bg-fourth table-responsive rounded shadow">
                        <h2 className="font-weight-bold mt-2">Technical data</h2>
                        <hr/>
                        <table className="m-3 w-100 align-self-center">
                            <tbody>
                            <tr>
                                <td className="font-weight-bold">Brand</td>
                                <td>{props.data.brand}</td>
                                <td className="font-weight-bold">Seats</td>
                                <td>{props.data.seats}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Model</td>
                                <td>{props.data.model}</td>
                                <td className="font-weight-bold">Year</td>
                                <td>{props.data.year}</td>

                            </tr>
                            <tr>
                                <td className="font-weight-bold">Luggage</td>
                                <td>
                                    <span><span>{props.data.trunkCapacity}</span> l</span>
                                </td>
                                <td className="font-weight-bold">Consumption</td>
                                <td>{props.data.litersPerHundredKilometers} l/100
                                    km
                                </td>
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
                ({dates}) => (
                    <CarInformation {...props} dates={dates}/>
                )
            }
        </DatesConsumer>
    )

};

export default withRouter(CarInformationWithContext)