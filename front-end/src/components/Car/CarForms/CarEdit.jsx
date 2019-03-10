import React, {Component} from 'react';
import Input from "../../Generic/Input";

import './CreateCar.css';
import services from '../../../services'


class CarEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
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

    componentDidMount() {
        const id = this.props.match.params.id;

        services.carService.getCarById(id)
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

        services.carService.editCar(this.state.id, this.state)
            .then(() => {
                this.props.history.push("/cars/all");
            })
            .catch((e) => {
                console.log(e)
            })
    }


    render() {
        return (
            <div className='container'>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4 text-center'>
                        <h1>Edit a car</h1>
                    </div>
                </div>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4'>
                        <form onSubmit={this.onSubmit}>
                            <Input onChange={this.onChange} name="brand" label="Brand" type="text"
                                   value={this.state.brand || ''}/>
                            <Input onChange={this.onChange} name="model" label="Model" type="text"
                                   value={this.state.model || ''}/>
                            <Input onChange={this.onChange} name="count" label="Count" type="number"
                                   value={this.state.count || ''}/>
                            <Input onChange={this.onChange} name="color" label="Color" type="text"
                                   value={this.state.color || ''}/>
                            <Input onChange={this.onChange} name="imageUrl" label="Image URL" type="text"
                                   value={this.state.imageUrl || ''}/>
                            <Input onChange={this.onChange} name="litersPerHundredKilometers"
                                   label="Fuel expense per KM"
                                   type="number" step="0.01" value={this.state.litersPerHundredKilometers || ''}/>
                            <Input onChange={this.onChange} name="pricePerDay" label="Price per day" type="number"
                                   step="0.01" value={this.state.pricePerDay || ''}/>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea onChange={this.onChange} name="description" id="description"
                                          value={this.state.brand || ''}>

                                </textarea>
                            </div>
                            <input type="submit" className="btn btn-primary form-control" value="Edit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


}

export default CarEdit;