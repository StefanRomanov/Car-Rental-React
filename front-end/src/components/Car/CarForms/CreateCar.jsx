import React, {Component, Fragment} from 'react';
import Input from "../../Generic/Input";

import './CreateCar.css';
import fetcher from "../../../data/fetcher";
import config from "../../../config/server-config";


class CreateCar extends Component {
    constructor(props) {
        super(props);
        this.state = {

            brand: null,
            model: null,
            power: null,
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

        fetcher.post(config.SERVER_PATH + "/cars/create", this.state)
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
            <Fragment>
                <h1>Add new car</h1>
                <form onSubmit={this.onSubmit} id="car-create-form">
                    <Input onChange={this.onChange} name="brand" label="Brand" type="text"/>
                    <Input onChange={this.onChange} name="model" label="Model" type="text"/>
                    <Input onChange={this.onChange} name="power" label="Horse power" type="number"/>
                    <Input onChange={this.onChange} name="color" label="Color" type="text"/>
                    <Input onChange={this.onChange} name="imageUrl" label="Image URL" type="text"/>
                    <Input onChange={this.onChange} name="litersPerHundredKilometers" label="Fuel expense per KM"
                           type="number" step="0.01"/>
                    <Input onChange={this.onChange} name="pricePerDay" label="Price per day" type="number" step="0.01"/>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea onChange={this.onChange} name="description" id="description" placeholder="Description..." />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </Fragment>
        )
    }


}

export default CreateCar;