import React, {Component} from 'react';
import Input from "../../Generic/Input";

import './CreateCar.css';
import services from '../../../services'


class CreateCar extends Component {
    constructor(props) {
        super(props);
        this.state = {

            brand: null,
            model: null,
            count: null,
            color: null,
            description: null,
            imageUrl: null,
            litersPerHundredKilometers: null,
            pricePerDay: null
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

        services.carService.createCar(this.state)
            .then(() => {
                this.handleRedirect();
            })
            .catch((e) => {
                console.log(e)
            })
    }

    handleRedirect() {
        window.location.href = 'http://localhost:3000/cars/all'
    }


    render() {
        return (
            <div className='container'>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4 text-center'>
                        <h1>Create a car</h1>
                    </div>
                </div>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.onSubmit}>
                            <Input onChange={this.onChange} name="brand" label="Brand" type="text"/>
                            <Input onChange={this.onChange} name="model" label="Model" type="text"/>
                            <Input onChange={this.onChange} name="count" label="Count" type="number"/>
                            <Input onChange={this.onChange} name="color" label="Color" type="text"/>
                            <Input onChange={this.onChange} name="imageUrl" label="Image URL" type="text"/>
                            <Input onChange={this.onChange} name="litersPerHundredKilometers"
                                   label="Fuel expense per KM"
                                   type="number" step="0.01"/>
                            <Input onChange={this.onChange} name="pricePerDay" label="Price per day" type="number"
                                   step="0.01"/>
                            <div>
                                <label htmlFor="description" className='form-control-label'>Description</label>
                                <textarea onChange={this.onChange} className="form-control mb-3" name="description" id="description"
                                          placeholder="Description..."/>
                            </div>
                            <input type="submit" className="btn btn-primary form-control" value="Create"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default CreateCar;