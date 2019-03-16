import React, {Component} from 'react';
import toastr from "toastr";

import Input from '../common/tools/Input';
import CarCard from "./CarCard";
import {carService} from '../../services'
import Paginator from "../common/tools/Paginator";
import {DatesConsumer} from "../../context/DatesContext";
import util from '../../util/util'
import withPaging from "../hoc/withPaging";
import {dateValidation} from "../../util/validation/formValidator";
import {dateHandler} from "../../util/validation/formErrorHandler";
import SearchInput from "../common/tools/SearchInput";
import withSearch from "../hoc/withSearch";

class CarsAvailable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                startDate: util.getCurrentDate(),
                endDate: util.getCurrentDate()
            },
            data: [],

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(e){
        e.preventDefault();
        this.fetchData();
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

        if(!dateHandler(startDate,endDate)){
            return
        }

        this.props.updateDates({startDate,endDate});
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.paging.page !== prevProps.paging.page){
            this.fetchData()
        }
    }

    fetchData(){
        carService.findAvailableCars('?page='+ this.props.paging.page,'&query=' + this.props.searchString, this.state.form)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.props.updatePages(res.totalPages);
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

        const {startDate,endDate} = this.state.form;

        const validation = dateValidation(startDate,endDate);

        return (
            <div className="container col-lg-8">
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <div className='form-row justify-content-center'>
                        <div className="my-3 col-lg-3">
                            <Input
                                onChange={this.onChange}
                                type="date" name="startDate"
                                label="Start date"
                                required={true}
                                value={startDate}
                                valid={validation.validStartDate}
                            />
                        </div>
                        <div className="my-3 col-lg-3">
                            <Input
                                onChange={this.onChange}
                                type="date" name="endDate"
                                label="Date of return"
                                required={true}
                                value={endDate}
                                valid={validation.validEndDate}
                            />
                        </div>
                        <div className="col-lg-1">
                            <button className="btn btn-primary mt-5 w-100" type="submit">Find</button>
                        </div>
                    </div>
                </form>
                <SearchInput onChange={this.props.onSearchChange} onSearchSubmit={this.onSearchSubmit} hidden={true}/>
                <hr/>

                <div>
                    {
                        this.state.data && this.state.data.length
                            ? this.state.data.map(c => <CarCard key={c.id} car={c}/>)
                            : <h3 className="text-center">No cars so found</h3>
                    }
                </div>
                <hr/>
                <Paginator nextPage={this.props.nextPage} prevPage={this.props.prevPage}
                           totalPages={this.props.paging.totalPages} page={this.props.paging.page + 1} pageChange={this.props.pageChange}/>
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

export default  withPaging(withSearch(AvailableCarsWithContext));