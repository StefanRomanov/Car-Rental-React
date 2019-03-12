import React, {Component} from 'react';
import Car from "./CarCard";
import SearchInput from '../common/SearchInput'

import {carService} from '../../services'
import Loading from "../common/Loading";
import Paginator from "../common/Paginator";


class Cars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
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
            .then(data => {
                console.log(data);
                this.setState({
                    isLoaded: true,
                    cars: data.entity.content,
                    totalPages: data.entity.totalPages
                });
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        if (!this.state.isLoaded) {
            return <Loading/>
        }

        return (
            <div className="container col-lg-8">
                <SearchInput/>
                <hr/>
                <div>
                    {
                        this.state.cars && this.state.cars.length
                            ? this.state.cars.map(c => <Car key={c.id} car={c}/>)
                            : <h1>No cars so far :(</h1>
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