import React, {Component} from 'react';
import fetcher from "../../data/fetcher";
import config from "../../config/server-config";


class Rent extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        fetcher.post(config.SERVER_PATH + "/rents/approve/" + this.props.data.id)
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <div className="rent">
                <h1>{this.props.data.car.brand}</h1>
                <h2>{this.props.data.car.model}</h2>
                <h3>{this.props.data.startDate}</h3>
                <h3>{this.props.data.endDate}</h3>
                <h3>{this.props.data.totalPrice}</h3>
                {
                    !this.props.data.approved
                        ?<button onClick={this.onClick}>Approve</button>
                        :null
                }

            </div>
        )
    }

}

export default Rent;