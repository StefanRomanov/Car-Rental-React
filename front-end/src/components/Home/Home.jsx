import React, {Component} from 'react';
import RentSearch from "../Rent/RentSearch";


class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="home">
                <h1>Home</h1>
                <RentSearch/>
            </div>
        )
    }

}

export default Home;