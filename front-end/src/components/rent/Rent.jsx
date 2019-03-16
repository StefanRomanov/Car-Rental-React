import React from 'react';

import FinishRentForm from "./FinishRentForm";
import RentAdminButtons from "./RentAdminButtons";
import util from "../../util/util";


export default (props) => {
        return (
            <div className="card shadow">
                <div className="card-horizontal">
                    <div className="card-body table-responsive justify-content-center">
                        <table className='w-75 ml-5'>
                            <tbody>
                                <tr>
                                    <th>Brand</th>
                                    <td>{props.data.car.brand}</td>
                                    <th>Start date</th>
                                    <td>{util.formatDate(props.data.startDate)}</td>
                                    <th>Total price</th>
                                    <td>${props.data.totalPrice}</td>
                                </tr>
                                <tr>
                                    <th>Model</th>
                                    <td>{props.data.car.model}</td>
                                    <th>Return date</th>
                                    <td>{util.formatDate(props.data.endDate)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                        {
                            !props.data.approved
                                ?(<div className="card-footer col-md-2">
                                    <RentAdminButtons id={props.data.id} update={props.update}/>
                                </div>)
                                :(<div className="card-footer col-md-4">
                                    <FinishRentForm id={props.data.id} update={props.update}/>
                                </div>)
                        }
                </div>
            </div>
        )
}