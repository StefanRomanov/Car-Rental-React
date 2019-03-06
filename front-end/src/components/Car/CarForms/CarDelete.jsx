import React, {Component, Fragment} from 'react';
import Input from "../../Generic/Input";

import './CreateCar.css';
import fetcher from "../../../data/fetcher";
import config from "../../../config/server-config";


class CarDelete extends Component {
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

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault();

        fetcher.remove(config.SERVER_PATH + "/cars/delete/"+ this.state.id)
            .then(() => {
                this.handleRedirect();
            })
            .catch((e) => {
                console.log(e)
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        fetcher.get(config.SERVER_PATH + '/cars/' + id)
            .then(data => {
                this.setState(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    handleRedirect() {
        window.location.href = 'http://localhost:3000/cars/all'
    }


    render() {
        return (
            <Fragment>
                <h1>Delete car</h1>
                <form onSubmit={this.onSubmit} id="car-create-form">
                    <Input name="brand" label="Brand" type="text" disabled={true} value={this.state.brand || ''}/>
                    <Input name="model" label="Model" type="text" disabled={true} value={this.state.model || ''}/>
                    <Input name="power" label="Horse power" type="number" disabled={true} value={this.state.power || ''}/>
                    <Input name="color" label="Color" type="text" disabled={true} value={this.state.color || ''}/>
                    <img src={this.state.imageUrl} alt=""/>
                    <Input name="litersPerHundredKilometers" label="Fuel expense per KM"
                           type="number" step="0.01" disabled={true} value={this.state.litersPerHundredKilometers || ''}/>
                    <Input name="pricePerDay" label="Price per day" type="number" step="0.01" disabled={true} value={this.state.pricePerDay || ''}/>
                    <div>
                        <label htmlFor="description" >Description</label>
                        <textarea name="description" id="description" disabled value={this.state.description || ''}/>
                    </div>
                    <button type="submit">Delete</button>
                </form>
            </Fragment>
        )
    }


}

export default CarDelete;