import {Component} from "react";
import {rentService} from "../../services";
import React from "react";
import {withRouter} from "react-router-dom";

class FinishRentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
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
            .then(() => {
                this.props.update();
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