import React, {Component} from 'react';
import authService from "../../services/authService";
import {Redirect} from "react-router";
import {UserConsumer, defaultState} from "../contexts/UserContext";

class Logout extends Component{

    componentDidMount(){
        authService.logout();

        this.props.updateUser(defaultState);
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