import React, {Component, Fragment} from 'react';
import Input from "../../Generic/Input";

import './CreateCar.css';
import fetcher from "../../../data/fetcher";
import config from "../../../config/server-config";


class CarEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
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

    componentDidMount() {
        const id = this.props.match.params.id;

        fetcher.get(config.SERVER_PATH + '/cars/' + id)
            .then(data => {
                console.log(data);
                this.setState(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        fetcher.post(config.SERVER_PATH + "/cars/edit/" + this.state.id, this.state)
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
                <h1>Edit car</h1>
                <form onSubmit={this.onSubmit} id="car-create-form">
                    <Input onChange={this.onChange} name="brand" label="Brand" type="text" value={this.state.brand || ''}/>
                    <Input onChange={this.onChange} name="model" label="Model" type="text" value={this.state.model || ''}/>
                    <Input onChange={this.onChange} name="power" label="Horse power" type="number" value={this.state.power || ''}/>
                    <Input onChange={this.onChange} name="color" label="Color" type="text" value={this.state.color || ''}/>
                    <Input onChange={this.onChange} name="imageUrl" label="Image URL" type="text" value={this.state.imageUrl || ''}/>
                    <Input onChange={this.onChange} name="litersPerHundredKilometers" label="Fuel expense per KM"
                           type="number" step="0.01" value={this.state.litersPerHundredKilometers || ''}/>
                    <Input onChange={this.onChange} name="pricePerDay" label="Price per day" type="number" step="0.01" value={this.state.pricePerDay || ''}/>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea onChange={this.onChange} name="description" id="description" value={this.state.brand || ''}>

                        </textarea>
                    </div>
                    <button type="submit">Edit</button>
                </form>
            </Fragment>
        )
    }


}

export default CarEdit;