import React, {Component} from 'react';
import Receipt from "./Receipt";


class AllReceipts extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="cars">
                <Receipt/>
                <Receipt/>
                <Receipt/>
                <Receipt/>
                <Receipt/>
            </div>
        )
    }

}

export default AllReceipts;