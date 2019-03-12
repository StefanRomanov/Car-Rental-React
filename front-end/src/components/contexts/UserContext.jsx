import decode from 'jwt-decode';
import {createContext} from 'react'

const defaultState = {
    role: '',
    username: '',
    isLoggedIn: false
};

function constructContext(){

    const token = window.localStorage.getItem("auth_token");
    if(token || token.length){
        try {
            const decoded = decode(token);

            return {
                username: decoded.sub,
                role: decoded.role,
                isLoggedIn: true
            };

        } catch (e) {
            //Ignored
        }

        return defaultState;
    }
}

const {Consumer: UserConsumer, Provider : UserProvider} = createContext(constructContext());

export  {
    UserConsumer,
    UserProvider,
    defaultState
}