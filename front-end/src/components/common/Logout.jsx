import React, {Component} from 'react';
import {Redirect} from "react-router";

import {UserConsumer, defaultUserState} from "../../context/UserContext";
import authService from "../../services/authService";
import toastr from "toastr";

class Logout extends Component{

    componentDidMount(){
        authService.logout();
        this.props.updateUser(defaultUserState);
    }

    render() {
        toastr.success('Successful logout');
        return (
            <Redirect to="/login"/>
        )
    }
}

const LogoutWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({updateUser}) => (
                    <Logout {...props} updateUser={updateUser}/>
                )
            }
        </UserConsumer>
    )
};

export default LogoutWithContext;