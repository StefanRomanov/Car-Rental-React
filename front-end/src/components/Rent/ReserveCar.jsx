import React, {Component} from 'react';
import Input from "../Generic/Input";
import services from '../../services'
import CarInformation from "../Car/CarDetails/CarInformation";


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

        services.rentService.reserve(this.state.id, this.state.form)
            .then(data => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            })
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
                <CarInformation data={this.state}/>
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