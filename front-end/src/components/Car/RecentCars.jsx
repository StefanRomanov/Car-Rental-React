import React, {Component} from 'react';
import Car from "./Car";
import SearchInput from '../Generic/SearchInput'


class RecentCars extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="homeCars">
                <Car/>
                <Car/>
                <Car/>
                <Car/>
            </div>
        )
    }
}

export default RecentCars;