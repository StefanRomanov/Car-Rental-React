import React, {Component} from 'react';
import {rentService} from '../../services/'
import {withRouter} from "react-router-dom";


class RentAdminButtons extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const name = e.target.name;

        if (name === 'approve') {
            rentService.approveRent(this.props.id)
                .then(() => {
                    this.props.update();
                })
        } else {
            rentService.declineRent(this.props.id)
                .then(() => {
                    this.props.update();
                })
        }
    }


    render() {
        return (<div className="row justify-content-around h-100">
            <button onClick={this.onClick} name="approve" className="btn btn-primary h-50">Approve</button>
            <button onClick={this.onClick} name="decline" className="btn btn-danger h-50">Decline</button>
        </div>);
    }

}

export default withRouter(RentAdminButtons);