import React, {Component} from 'react';
import Car from "../common/CarCard";
import SearchInput from '../common/SearchInput'

import {carService} from '../../services'
import Paginator from "../common/Paginator";
import toastr from "toastr";


class Cars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: [],
            page: 0,
            totalPages: 0
        };

        this.turnNextPage = this.turnNextPage.bind(this);
        this.turnPreviousPage = this.turnPreviousPage.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
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
        carService.getAllCars('?page=' + this.state.page)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.setState({
                        cars: res.entity.content,
                        totalPages: res.entity.totalPages
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {

        return (
            <div className="container col-lg-8">
                <SearchInput/>
                <hr/>
                <div className='text-center'>
                    {
                        this.state.cars && this.state.cars.length
                            ? this.state.cars.map(c => <Car key={c.id} car={c}/>)
                            : <h3>No cars found</h3>
                    }
                </div>
                <hr/>
                <Paginator nextPage={this.turnNextPage} prevPage={this.turnPreviousPage}
                           totalPages={this.state.totalPages} page={this.state.page + 1} pageChange={this.pageChange}/>
            </div>
        )
    }

}

export default Cars;