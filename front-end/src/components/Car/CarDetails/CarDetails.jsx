import React, {Component} from 'react';
import services from '../../../services'
import {Link} from "react-router-dom";
import Loading from "../../Generic/Loading";
import CarInformation from "./CarInformation";


class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            id: null,
            brand: null,
            model: null,
            count: null,
            color: null,
            description: null,
            imageUrl: null,
            litersPerHundredKilometers: null,
            pricePerDay: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        services.carService.getCarById(id)
            .then(data => {
                this.setState({
                    isLoaded: true,
                    ...data
                });
            })
            .catch(e => {
                console.log(e);
            })
    }


    render() {
        if (!this.state.isLoaded) {
            return <Loading/>
        }

        return (
            <CarInformation data={this.state}/>
        )
    }

}

export default CarDetails;