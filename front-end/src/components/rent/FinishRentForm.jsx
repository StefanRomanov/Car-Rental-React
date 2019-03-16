import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import toastr from "toastr";

import {rentService} from "../../services";
import util from "../../util/util"

class FinishRentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: util.getCurrentDate()
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        rentService.finishRent(this.props.id,this.state)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    toastr.success('Rent finished successfully');
                    this.props.update();
                }
            });
    }


    render() {
        return (
            <form className="form-inline" onSubmit={this.onSubmit}>
                <div className="form-row w-100 justify-content-between">
                    <div className="col-md-8 my-3">
                        <input onChange={this.onChange} type="date" name="date" className="form-control w-100" value={this.state.date}/>
                    </div>
                    <div className="col-md-4 my-3">
                        <button type="submit" className="btn btn-primary w-100">Finish</button>

                    </div>
                </div>
            </form>
        )
    }

}

export default withRouter(FinishRentForm);