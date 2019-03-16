import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router";
import toastr from "toastr";

import fetcher from "../../../services/fetcher";
import config from "../../../config/server-config";


class CarDelete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false
        }
    }


    componentDidMount() {
        const id = this.props.match.params.id;

        fetcher.remove(config.SERVER_PATH + "/cars/delete/"+ id)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                    this.props.history.push('/cars/all')
                } else {
                    toastr.success('Successful deletion');
                    this.setState({
                        done: true
                    })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }


    render() {
        if(this.state.done){
            return (
                <Redirect to="/cars/all"/>
            )
        } else {
            return '';
        }
    }
}

export default withRouter(CarDelete);