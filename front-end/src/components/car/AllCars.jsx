import React, {Component} from 'react';
import toastr from "toastr";

import SearchInput from '../common/tools/SearchInput'
import Car from "./CarCard";
import {carService} from '../../services'
import Paginator from "../common/tools/Paginator";

import withPaging from "../hoc/withPaging";
import withSearch from "../hoc/withSearch";


class AllCars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: [],
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.paging.page !== prevProps.paging.page){
            this.fetchData()
        }
    }

    onSearchSubmit(e){
        e.preventDefault();
        this.fetchData();
    }

    fetchData(){
        carService.getAllCars('?page=' + this.props.paging.page,'&query=' + this.props.searchString)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.props.updatePages(res.totalPages);
                    this.setState({
                        cars: res.content,
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {

        return (
            <div className="container col-lg-8 mt-5">
                <SearchInput onChange={this.props.onSearchChange} onSearchSubmit={this.onSearchSubmit} />
                <hr/>
                <div className='text-center'>
                    {
                        this.state.cars && this.state.cars.length
                            ? this.state.cars.map(c => <Car key={c.id} car={c}/>)
                            : <h3>No cars found</h3>
                    }
                </div>
                <hr/>
                <Paginator nextPage={this.props.nextPage} prevPage={this.props.prevPage}
                           totalPages={this.props.paging.totalPages} page={this.props.paging.page + 1} pageChange={this.props.pageChange}/>
            </div>
        )
    }

}

export default withPaging(withSearch(AllCars));