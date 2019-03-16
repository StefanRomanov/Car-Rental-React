import React, {Component} from 'react';
import {withRouter} from "react-router";
import toastr from "toastr";


import {carService} from '../../../services'
import {createCarValidation} from "../../../util/validation/formValidator";
import {createCarHandler} from "../../../util/validation/formErrorHandler";
import Input from "../../common/tools/Input";
import {Link} from "react-router-dom";

class CarEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            brand: '',
            model: '',
            count: '',
            seats: '',
            year: '',
            description: '',
            imageUrl: '',
            litersPerHundredKilometers: '',
            pricePerDay: '',
            trunkCapacity: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        carService.getCarById(id)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                    this.props.history.push('/cars/all')
                } else {
                    this.setState(res);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        let {brand, model, year, seats, count, trunkCapacity, description, imageUrl, litersPerHundredKilometers, pricePerDay} = this.state;

        if (!createCarHandler(brand, model, count, seats, year, litersPerHundredKilometers, description, imageUrl, trunkCapacity, pricePerDay)) {
            return;
        }

        carService.editCar(this.state.id, this.state)
            .then((res) => {
                if (res.success === false) {
                    toastr.error(res.message);
                }
                toastr.success('Successful edit');
                this.props.history.push("/cars/all");
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
                        <h1>Edit a car</h1>
                    </div>
                </div>
                <hr/>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-8'>
                        <form onSubmit={this.onSubmit}>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="brand" label="Brand" type="text"
                                       value={brand} valid={validation.validBrand}/>
                                <Input onChange={this.onChange} name="model" label="Model" type="text"
                                       value={model} valid={validation.validModel}/>
                            </div>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="count" label="Count" type="number"
                                       value={count} valid={validation.validCount}/>
                                <Input onChange={this.onChange} name="seats" label="Seats" type="number"
                                       value={seats} valid={validation.validSeats}/>
                                <Input onChange={this.onChange} name="year" label="Year" type="number"
                                       value={year} valid={validation.validYear}/>
                            </div>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="imageUrl" label="Image URL" type="text"
                                       value={imageUrl} valid={validation.validImage}/>

                                <Input onChange={this.onChange} name="trunkCapacity" label="Trunk Capacity"
                                       type="number"
                                       value={trunkCapacity} valid={validation.validTrunkCapacity}/>
                            </div>
                            <div className="row justify-content-around">
                                <Input onChange={this.onChange} name="litersPerHundredKilometers"
                                       label="Fuel consumption(l/100km)"
                                       type="number" step="0.01" value={litersPerHundredKilometers}
                                       valid={validation.validFuelExpense}/>
                                <Input onChange={this.onChange} name="pricePerDay" label="Price per day"
                                       type="number"
                                       step="0.01" value={pricePerDay} valid={validation.validPrice}/>
                            </div>
                            <div>
                                <label htmlFor="description" className='form-control-label'>Description</label>
                                <textarea onChange={this.onChange} name="description" id="description"
                                          className={validation.validDescription ? 'is-valid form-control mb-3' : 'is-invalid form-control mb-3'}
                                          value={description}
                                />
                            </div>
                            <hr/>
                                <div className="row justify-content-center my-3">
                                    <button type='submit' className="btn btn-info mx-3 text-white w-25"
                                            >Edit</button>
                                    <Link to="/cars/all" className="btn btn-danger mx-3 text-white w-25">Cancel</Link>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default withRouter(CarEdit);