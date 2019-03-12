import React, {Component, Fragment} from 'react';
import Rent from "./Rent";
import {rentService} from '../../services/'
import Loading from "../common/Loading";
import Paginator from "../common/Paginator";


class RentsActive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            page: 0,
            totalPages: 0,
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
        if (this.state.loading || this.state.page !== prevState.page) {
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

    fetchData() {
        if (this.state.loading) {
            rentService.activeRents('?page=' + this.state.page)
                .then(data => {
                    this.setState({
                        data,
                        loading: false,
                        totalPages: data.totalPages
                    })
                })
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        }
        return (
            <Fragment>
                <div className="container col-lg-8 my-5 jumbotron">
                    {
                        this.state.data && this.state.data.length
                            ? this.state.data.map(r => <Rent update={this.updateList} key={r.id} data={r}/>)
                            : <h1>No rents so far :(</h1>
                    }
                </div>
                <hr/>
                <Paginator nextPage={this.turnNextPage} prevPage={this.turnPreviousPage}
                           totalPages={this.state.totalPages} page={this.state.page + 1} pageChange={this.pageChange}/>
            </Fragment>
        )
    }

}

export default RentsActive;