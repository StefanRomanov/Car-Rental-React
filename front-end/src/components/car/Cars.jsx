import React, {Component} from 'react';
import Car from "../common/CarCard";
import SearchInput from '../common/SearchInput'

import {carService} from '../../services'
import Paginator from "../common/Paginator";
import toastr from "toastr";
import withPaging from "../hoc/withPaging";


class Cars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: [],
        };
    }

    componentDidMount() {
        this.fetchData()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.paging.page !== prevProps.paging.page){
            this.fetchData()
        }
    }

    fetchData(){
        carService.getAllCars('?page=' + this.props.paging.page)
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
                <Paginator nextPage={this.props.nextPage} prevPage={this.props.prevPage}
                           totalPages={this.props.paging.totalPages} page={this.props.paging.page + 1} pageChange={this.props.pageChange}/>
            </div>
        )
    }

}

export default withPaging(Cars);