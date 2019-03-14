import React, {Component} from 'react';
import Input from '../../common/Input';
import CarCard from "../../common/CarCard";
import {carService} from '../../../services'
import Paginator from "../../common/Paginator";
import toastr from "toastr";
import {DatesConsumer} from "../../../context/DatesContext";
import util from '../../../services/util'

class CarsAvailable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                startDate: util.getCurrentDate(),
                endDate: util.getCurrentDate()
            },
            data: [],
            page: 0,
            totalPages: 0

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.turnPreviousPage = this.turnPreviousPage.bind(this);
        this.turnNextPage = this.turnNextPage.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    onChange(e) {
        const form = {...this.state.form};
        form[e.target.name] = e.target.value;

        this.setState({
            form
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {startDate, endDate} = this.state.form;
        this.props.updateDates({startDate,endDate})
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.page !== prevState.page){
            this.fetchData()
        }
    }

    turnNextPage() {
        this.setState({
            page: this.state.page + 1
        })
    }

    turnPreviousPage() {
        this.setState({
            page: this.state.page - 1
        })
    }

    pageChange(e) {
        this.setState({
            page: e.target.value
        })
    }

    fetchData(){
        carService.findAvailableCars('?page='+ this.state.page, this.state.form)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.setState({
                        data: res.content
                    })
                }

            })
            .catch((e) => {
                console.log(e)
            })
    }

    render() {
        return (
            <div className="container col-lg-8">
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4 text-center'>
                        <h1>Find available cars</h1>
                    </div>
                </div>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <div className='form-row col-lg-12 justify-content-center'>
                        <div className="my-3 col-lg-4">
                            <Input
                                onChange={this.onChange}
                                type="date" name="startDate"
                                label="Start date"
                                required={true}
                                value={this.state.form.startDate}
                            />
                        </div>
                        <div className="my-3 col-lg-4">
                            <Input
                                onChange={this.onChange}
                                type="date" name="endDate"
                                label="Date of return"
                                required={true}
                                value={this.state.form.endDate}
                            />
                        </div>
                        <div className="col-4 justify-content-center">
                            <button className="btn btn-primary" type="submit">Find</button>
                        </div>
                    </div>
                </form>

                <div>
                    {
                        this.state.data && this.state.data.length
                            ? this.state.data.map(c => <CarCard key={c.id} car={c}/>)
                            : <h3 className="text-center">No cars so found</h3>
                    }
                </div>
                <hr/>
                <Paginator nextPage={this.turnNextPage} prevPage={this.turnPreviousPage}
                           totalPages={this.state.totalPages} page={this.state.page + 1} pageChange={this.pageChange}/>
            </div>
        )
    }

}

const AvailableCarsWithContext = (props) => {

    return (
        <DatesConsumer>
            {
                ({dates, updateDates}) =>(
                    <CarsAvailable {...props} dates={dates} updateDates={updateDates} />
                )
            }
        </DatesConsumer>
    )

};

export default  AvailableCarsWithContext;