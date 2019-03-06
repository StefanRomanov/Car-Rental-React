import React, {Component} from 'react';
import fetcher from "../../../data/fetcher";
import config from "../../../config/server-config";
import {NavLink} from "react-router-dom";


class CarDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded : false,
            id: null,
            brand: null,
            model: null,
            power: null,
            color: null,
            description: null,
            imageUrl: null,
            litersPerHundredKilometers: null,
            pricePerDay: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        fetcher.get(config.SERVER_PATH + '/cars/' + id)
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
        if(!this.state.isLoaded){
            return <h1>Loading...</h1>
        }

        return (
            <div className="home">
                <h1>{this.state.brand}</h1>
                <h2>{this.state.model}</h2>
                <img src={this.state.imageUrl} alt=""/>
                <h3>{this.state.pricePerDay}</h3>
                <h4>{this.state.power}</h4>
                <div>
                    <p>{this.state.description}</p>
                </div>
                <div>
                    <NavLink to={"/cars/details/" + this.state.id}>Details</NavLink>
                    <NavLink to={"/cars/edit/" + this.state.id}>Edit</NavLink>
                    <NavLink to={"/cars/delete/" + this.state.id}>Delete</NavLink>
                </div>
            </div>
        )
    }

}

export default CarDetails;