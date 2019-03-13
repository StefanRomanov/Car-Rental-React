import React, {Component, Fragment} from 'react';
import Input from "../../common/Input";
import {carService} from "../../../services";
import {DatesConsumer} from "../../../context/DatesContext";
import {withRouter} from "react-router";
import toastr from "toastr";
import util from '../../../services/util'

class CarCheckForm extends Component {

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

    onReserveClick(){
        const {startDate, endDate} = this.state;
        this.props.updateDates({startDate,endDate});
        this.props.history.push('/cars/reserve/'+ this.props.id);
    }

    onSubmit(e) {
        e.preventDefault();

        carService.checkAvailability(this.props.id, this.state.startDate, this.state.endDate)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.setState({
                        available: res.entity,
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

        return (
            <div className='container col-lg-2 mt-5'>
                <div className='bg-primary rounded shadow justify-content-around h-85'>
                    <form onSubmit={this.onSubmit}>
                        <div className='row space-top justify-content-center'>
                            <div className='col-lg-10'>
                                <Input type='date' value={startDate} name='startDate'
                                       onChange={this.onChange}/>
                                <Input type='date' value={endDate} name='endDate' onChange={this.onChange}/>
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
                                                <button className='btn bg-info w-100 shadow text-white btn-outline-light'
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
                    <CarCheckForm {...props} dates={dates} updateDates={updateDates}/>
                )
            }
        </DatesConsumer>
    )

};

export default withRouter(CarCheckFormWithContext);