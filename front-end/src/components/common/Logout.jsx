import React, {Component} from 'react';
import authService from "../../services/authService";
import {Redirect} from "react-router";
import {UserConsumer, defaultUserState} from "../../context/UserContext";

class Logout extends Component{

    componentDidMount(){
        authService.logout();

        this.props.updateUser(defaultUserState);
    }

    render() {
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