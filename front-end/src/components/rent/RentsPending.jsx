import React, {Component} from 'react';
import Rent from "./Rent";
import {rentService} from '../../services'
import Paginator from "../common/Paginator";
import toastr from "toastr";


class RentsPending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            //TODO FIX THAT NAME
            loading: true,
            page: 0,
            totalPages: 0
        };

        this.updateList = this.updateList.bind(this);
        this.turnNextPage = this.turnNextPage.bind(this);
        this.turnPreviousPage = this.turnPreviousPage.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    updateList() {
        this.setState({
            loading: true
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.loading || this.state.page !== prevState.page){
            this.fetchData();
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
        rentService.pendingRents('?page='+this.state.page)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {
                    this.setState({
                        data: res.content,
                        loading: false,
                        totalPages: res.totalPages
                    })
                }
            })
    }


    render() {

        return (
            <div className="container col-lg-8">
                <div className="my-5 jumbotron text-center">
                    {
                        this.state.data && this.state.data.length
                            ? this.state.data.map(r => <Rent update={this.updateList} key={r.id} data={r}/>)
                            : <h3>No rents found</h3>
                    }
                </div>
                <hr/>
                <Paginator nextPage={this.turnNextPage} prevPage={this.turnPreviousPage}
                           totalPages={this.state.totalPages} page={this.state.page + 1} pageChange={this.pageChange}/>
            </div>

        )
    }

}

export default RentsPending;