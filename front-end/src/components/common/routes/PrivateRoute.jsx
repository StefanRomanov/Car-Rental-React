import React from 'react';
import {Route, Redirect} from "react-router-dom";

import {UserConsumer} from '../../../context/UserContext'

const PrivateRoute = (props) => {
    const {user, allowedRoles, ...otherProps} = props;

    if(!user.isLoggedIn || !allowedRoles.includes(user.role)){
        return <Redirect to="/login"/>
    }

    return <Route {...otherProps}/>

};

const PrivateRouteWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({user}) => (
                    <PrivateRoute {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};


export default PrivateRouteWithContext;