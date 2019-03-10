import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Car extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card shadow rounded-lg">
                <div className="card-horizontal">
                    <div className="card-image m-3">
                        <img className="card-image" src={this.props.imageUrl} alt=""/>
                    </div>
                    <div className="card-body">
                        <div className="card-columns">
                            <h3>{this.props.brand}</h3>
                            <h4>{this.props.model}</h4>
                            <h3>{this.props.brand}</h3>
                            <h5>{this.props.pricePerDay}</h5>
                            <h5>{this.props.pricePerDay}</h5>
                            <h5>{this.props.pricePerDay}</h5>
                            <h5>{this.props.pricePerDay}</h5>
                        </div>
                    </div>
                    <div className="card-footer col-lg-2">
                        <div className="row my-3">
                            <Link className="btn btn-info col-lg-6"
                                     to={"/cars/details/" + this.props.id}>Details</Link>
                            <Link className="btn btn-primary col-lg-6"
                                     to={"/cars/reserve/" + this.props.id}>Reserve</Link>
                        </div>
                        <div className="row my-3">
                            <Link className="btn btn-warning col-lg-6"
                                     to={"/cars/edit/" + this.props.id}>Edit</Link>
                            <Link className="btn btn-danger col-lg-6"
                                     to={"/cars/delete/" + this.props.id}>Delete</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Car;