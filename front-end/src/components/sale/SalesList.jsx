import React, {Component} from 'react';

import toastr from "toastr";

import {UserConsumer} from "../../context/UserContext";
import Sale from "./Sale";
import {saleService} from '../../services';
import {withRouter} from "react-router";


class SalesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        saleService.getSalesByUsername(this.props.user.username)
            .then(res => {
                if(res.success === false){
                    toastr.error(res.message);
                    this.props.history.push('/');
                } else {
                    this.setState({
                        data: res
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

export default withRouter(SalesListWithContext);