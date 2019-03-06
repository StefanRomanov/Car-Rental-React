import React, {Component} from 'react';
import {NavLink} from "react-router-dom";


class Car extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="car">
                <h3>{this.props.brand}</h3>
                <h4>{this.props.model}</h4>
                <h5>{this.props.pricePerDay}</h5>
                <NavLink to={"/cars/details/" + this.props.id}>Details</NavLink>
                <NavLink to={"/cars/edit/" + this.props.id}>Edit</NavLink>
                <NavLink to={"/cars/delete/" + this.props.id}>Delete</NavLink>
                <NavLink to={"/cars/reserve/" + this.props.id}>Reserve</NavLink>
            </div>
        )
    }

}

export default Car;