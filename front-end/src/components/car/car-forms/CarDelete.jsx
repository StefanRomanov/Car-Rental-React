import React, {Component, Fragment} from 'react';
import toastr from "toastr";

import './CreateCar.css';
import fetcher from "../../../services/fetcher";
import config from "../../../config/server-config";
import {Redirect, withRouter} from "react-router";


class CarDelete extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;

        fetcher.remove(config.SERVER_PATH + "/cars/delete/"+ id)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }


    render() {

        return (
            <Redirect to="/cars/all"/>
        )
    }
}

export default withRouter(CarDelete);