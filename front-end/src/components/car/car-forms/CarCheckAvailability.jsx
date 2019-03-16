import React, {Component, Fragment} from 'react';
import toastr from "toastr";
import {withRouter} from "react-router";

import Input from "../../common/tools/Input";
import {carService} from "../../../services";
import {DatesConsumer} from "../../../context/DatesContext";
import {dateValidation} from "../../../util/validation/formValidator";
import util from '../../../util/util'
import {dateHandler} from "../../../util/validation/formErrorHandler";


class CarCheckAvailability extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: util.getCurrentDate(),
            endDate: util.getCurrentDate(),
            submitted: false,
            available: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReserveClick = this.onReserveClick.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onReserveClick() {
        const {startDate, endDate} = this.state;
        this.props.updateDates({startDate, endDate});
        this.props.history.push('/cars/reserve/' + this.props.id);
    }

    onSubmit(e) {
        e.preventDefault();
        const {startDate, endDate} = this.state;

        if(!dateHandler(startDate,endDate)){
            return
        }

        carService.checkAvailability(this.props.id, startDate, endDate)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.setState({
                        available: res,
                        submitted: true
                    });
                }

            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {

        const {startDate, endDate, submitted, available} = this.state;
        const validation = dateValidation(startDate,endDate);

        return (
            <div className='container col-lg-2 mt-5'>
                <div className='bg-primary rounded shadow justify-content-around h-85'>
                    <form onSubmit={this.onSubmit}>
                        <div className='row space-top justify-content-center'>
                            <div className='col-lg-10'>
                                <Input type='date'
                                       value={startDate}
                                       name='startDate'
                                       onChange={this.onChange}
                                       valid={validation.validStartDate}/>
                                <Input type='date'
                                       value={endDate} name='endDate'
                                       onChange={this.onChange}
                                       valid={validation.validEndDate}/>
                                <button type='submit' className='btn btn-success form-control shadow'>Check Availability
                                </button>
                            </div>
                        </div>
                    </form>
                    {
                        submitted ? (
                            <Fragment>
                                {
                                    available ? (
                                        <Fragment>
                                            <div className='container bg-success rounded w-75'>
                                                <div className='mt-5 text-center text-white rounded'>
                                                    <h3>Available</h3>
                                                </div>
                                            </div>
                                            <div className='container mt-5 w-85 align-items-center'>
                                                <button
                                                    className='btn bg-info w-100 shadow text-white btn-outline-light'
                                                    onClick={this.onReserveClick}>
                                                    Reserve
                                                </button>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <div className='container bg-danger rounded w-75'>
                                            <div className='mt-5 text-center text-white rounded'>
                                                <h3>Not Available</h3>
                                            </div>
                                        </div>
                                    )
                                }
                            </Fragment>
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

const CarCheckFormWithContext = (props) => {

    return (
        <DatesConsumer>
            {
                ({dates, updateDates}) => (
                    <CarCheckAvailability {...props} dates={dates} updateDates={updateDates}/>
                )
            }
        </DatesConsumer>
    )

};

export default withRouter(CarCheckFormWithContext);