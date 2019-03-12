import React from 'react';
import {Link} from "react-router-dom";

export default (props) => {
    return <div className="container">
        <div className="clearfix col-lg-12 m-5 align-self-center">
            <div className="row">
                <div className="col-md app-bg-fourth rounded shadow">
                    <div className="m-3">
                        <h1>{props.data.brand} {props.data.model}</h1>
                        <h2>Year of manufacture</h2>
                        <div className="">
                            <div>2016</div>
                        </div>
                        <h2>Description</h2>
                        <pre className="text-wrap pre-scrollable">
                                    {props.data.description}
                                </pre>
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
    </div>
}