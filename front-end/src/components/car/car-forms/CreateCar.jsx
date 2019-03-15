import React, {Component} from 'react';
import Input from "../../common/Input";

import './CreateCar.css';
import {carService} from '../../../services'
import {createCarValidation} from '../../../config/formValidator'
import {createCarHandler} from "../../../config/formErrorHandler";
import toastr from "toastr";
import {withRouter} from "react-router";


class CreateCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            model: '',
            count: '',
            seats: '',
            year: '',
            trunkCapacity: '',
            description: '',
            imageUrl: '',
            litersPerHundredKilometers: '',
            pricePerDay: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let {brand, model, year, seats, count, trunkCapacity, description, imageUrl, litersPerHundredKilometers, pricePerDay} = this.state;

        if (!createCarHandler(brand, model, count, seats, year, litersPerHundredKilometers, description, imageUrl, trunkCapacity, pricePerDay)) {
            return;
        }

        carService.createCar(this.state)
            .then((res) => {
                if (res.success === false) {
                    toastr.error(res.message);
                }
                this.props.history.push("/cars/all")
            })
            .catch((e) => {
                console.log(e)
            })
    }


    render() {
        let {brand, model, year, seats, count, trunkCapacity, description, imageUrl, litersPerHundredKilometers, pricePerDay} = this.state;

        let validation = createCarValidation(brand, model, count, seats, year, litersPerHundredKilometers, description, imageUrl, trunkCapacity, pricePerDay);

        return (
            <div className='container'>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4 text-center'>
                        <h1>Add a car</h1>
                    </div>
                </div>
                <hr/>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-8'>
                        <form onSubmit={this.onSubmit}>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="brand" label="Brand" type="text"
                                       value={this.state.brand} valid={validation.validBrand}/>
                                <Input onChange={this.onChange} name="model" label="Model" type="text"
                                       value={this.state.model} valid={validation.validModel}/>
                            </div>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="count" label="Count" type="number"
                                       value={this.state.count} valid={validation.validCount}/>
                                <Input onChange={this.onChange} name="seats" label="Seats" type="number"
                                       value={this.state.seats} valid={validation.validSeats}/>
                                <Input onChange={this.onChange} name="year" label="Year" type="number"
                                       value={this.state.year} valid={validation.validYear}/>
                            </div>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="imageUrl" label="Image URL" type="text"
                                       value={this.state.imageUrl} valid={validation.validImage}/>
                                <Input onChange={this.onChange} name="trunkCapacity" label="Trunk Capacity"
                                       type="number"
                                       value={this.state.trunkCapacity} valid={validation.validTrunkCapacity}/>
                            </div>

                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="litersPerHundredKilometers"
                                       label="Fuel expense per KM"
                                       type="number" step="0.01"
                                       value={this.state.litersPerHundredKilometers}
                                       valid={validation.validFuelExpense}/>
                                <Input onChange={this.onChange} name="pricePerDay" label="Price per day" type="number"
                                       step="0.01"
                                       value={this.state.pricePerDay} valid={validation.validPrice}/>
                            </div>
                            <div>
                                <label htmlFor="description" className='form-control-label'>Description</label>
                                <textarea onChange={this.onChange}
                                          className={validation.validDescription ? 'is-valid form-control mb-3' : 'is-invalid form-control mb-3'}
                                          name="description"
                                          id="description"
                                          value={this.state.description}
                                />
                            </div>
                            <hr/>
                            <div className="row justify-content-around">
                                <input type="submit" className="btn btn-primary form-control w-50" value="Add"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default withRouter(CreateCar);