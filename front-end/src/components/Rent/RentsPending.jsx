import React, {Component} from 'react';
import Rent from "./Rent";
import fetcher from "../../data/fetcher";
import config from "../../config/server-config";


class RentsPending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        fetcher.get(config.SERVER_PATH + "/rents/unapproved")
            .then(data => {
                this.setState({
                    data
                })
            })
    }


    render() {
        return (
            <div className="active">
                {
                    this.state.data && this.state.data.length
                        ? this.state.data.map(r => <Rent data={r}/>)
                        : <h1>No rents so far :(</h1>
                }
            </div>
        )
    }

}

export default RentsPending;