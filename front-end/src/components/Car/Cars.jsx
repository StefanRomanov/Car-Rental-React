import React, {Component} from 'react';
import Car from "./Car";
import SearchInput from '../Generic/SearchInput'

import services from '../../services'
import Loading from "../Generic/Loading";


class Cars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            cars: null
        }
    }

    componentDidMount() {

        services.carService.getAllCars()
            .then(data => {
                console.log(data);
                this.setState({
                    isLoaded: true,
                    cars: data.entity
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
            <div className="container col-lg-8">
                <SearchInput/>
                <div>
                    {
                        this.state.cars && this.state.cars.length
                            ? this.state.cars.map(c => <Car key={c.id} brand={c.brand} model={c.model}
                                                            pricePerDay={c.pricePerDay} id={c.id} imageUrl={c.imageUrl}/>)
                            : <h1>No cars so far :(</h1>
                    }
                </div>
            </div>
        )
    }

}

export default Cars;