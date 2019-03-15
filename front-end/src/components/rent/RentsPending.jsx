import React, {Component} from 'react';
import Rent from "./Rent";
import {rentService} from '../../services'
import Paginator from "../common/Paginator";
import toastr from "toastr";
import withPaging from "../hoc/withPaging";


class RentsPending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            //TODO FIX THAT NAME
            loading: true
        };

        this.updateList = this.updateList.bind(this);
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
        if(this.state.loading || this.props.paging.page !== prevProps.paging.page){
            this.fetchData();
        }
    }
    fetchData(){
        rentService.pendingRents('?page='+this.props.paging.page)
            .then(res => {
                if (res.success === false) {
                    toastr.error(res.message);
                } else {

                    this.props.updatePages(res.totalPages);
                    this.setState({
                        data: res.content,
                        loading: false,
                    });
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
                <Paginator nextPage={this.props.nextPage} prevPage={this.props.prevPage}
                           totalPages={this.props.paging.totalPages} page={this.props.paging.page + 1} pageChange={this.props.pageChange}/>
            </div>
        )
    }

}

export default withPaging(RentsPending);