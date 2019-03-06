import React, {Component} from 'react';
import Car from "./Car";
import SearchInput from '../Generic/SearchInput'
import fetcher from "../../data/fetcher";
import config from "../../config/server-config";


class Cars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            cars: null
        }
    }

    componentDidMount() {

        fetcher.get(config.SERVER_PATH + '/cars/all')
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
        if(!this.state.isLoaded){
            return <h1>Loading...</h1>
        }

        return (
            <div className="cars">
                <SearchInput/>
                {
                    this.state.cars && this.state.cars.length
                        ? this.state.cars.map(c => <Car key={c.id} brand={c.brand} model={c.model} pricePerDay={c.pricePerDay} id={c.id}/>)
                        : <h1>No cars so far :(</h1>
                }
            </div>
        )
    }

}

export default Cars;