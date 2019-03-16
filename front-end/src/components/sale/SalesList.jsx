import React, {Component} from 'react';

import toastr from "toastr";

import {UserConsumer} from "../../context/UserContext";
import Sale from "./Sale";
import {saleService} from '../../services';
import {withRouter} from "react-router";
import withPaging from "../hoc/withPaging";
import Paginator from "../common/tools/Paginator";
import SearchInput from "../common/tools/SearchInput";
import withSearch from "../hoc/withSearch";


class SalesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: false
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.paging.page !== prevProps.paging.page) {
            this.fetchData();
        }
    }

    onSearchSubmit(e){
        e.preventDefault();
        this.fetchData();
    }

    fetchData(){
        saleService.getSalesByUsername('?page=' + this.props.paging.page, this.props.user.username,'&query=' + this.props.searchString)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                    this.props.history.push('/');
                } else {
                    this.props.updatePages(res.totalPages);
                    this.setState({
                        data: res.content
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        return (
            <div className='container mt-5'>
                <SearchInput onChange={this.props.onSearchChange} onSearchSubmit={this.onSearchSubmit} />
                <hr/>
                <div className='table-responsive bg-light rounded'>
                    <table className='table table-hover table-striped'>
                        <thead>
                        <tr>
                            <th>Rent #</th>
                            <th>Issue date</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total price</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data.map(s => <Sale key={s.id} sale={s}/>)
                        }
                        </tbody>
                    </table>
                </div>
                <hr/>
                <Paginator nextPage={this.props.nextPage} prevPage={this.props.prevPage}
                           totalPages={this.props.paging.totalPages} page={this.props.paging.page + 1}
                           pageChange={this.props.pageChange}/>
            </div>
        )
    }
}


const SalesListWithContext = (props) => {

    return (
        <UserConsumer>
            {
                ({user}) => (
                    <SalesList {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};

export default withRouter(withPaging(withSearch(SalesListWithContext)));