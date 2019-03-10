import React from 'react';
import FinishRentForm from "./FinishRentForm";
import RentAdminButtons from "./RentAdminButtons";


export default (props) => {
        return (
            <div className="card shadow">
                <div className="card-horizontal">
                    <div className="card-body">
                        <div className="card-columns">
                            <h4>{props.data.car.brand}</h4>
                            <h4>{props.data.car.model}</h4>
                            <h5>Start date: {props.data.startDate}</h5>
                            <h5>Return date: {props.data.endDate}</h5>
                            <h5>Total cost: {props.data.totalPrice} &#1083;&#1074;</h5>
                        </div>
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