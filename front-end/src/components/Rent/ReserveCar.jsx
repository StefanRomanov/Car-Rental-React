import React, {Component} from 'react';
import fetcher from '../../data/fetcher';
import config from "../../config/server-config";
import Input from "../Generic/Input";


class ReserveCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                startDate: null,
                endDate: null
            },
            isLoaded: false,
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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(e) {
        e.preventDefault();

        fetcher.post(config.SERVER_PATH + "/rents/reserve/" + this.state.id, this.state.form)
            .then(data => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            })
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

    onChange(e) {
        const form = {...this.state.form};
        form[e.target.name]= e.target.value;

        this.setState({
            form
        });
    }

    render() {
        if (!this.state.isLoaded) {
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
                <form onSubmit={this.onSubmit}>
                    <h1>Pick Dates</h1>
                    <Input onChange={this.onChange} type="date" name="startDate" label="Start date"/>
                    <Input onChange={this.onChange} type="date" name="endDate" label="Date of return"/>
                    <button type="submit">Reserve</button>
                </form>
            </div>
        )
    }

}

export default ReserveCar;