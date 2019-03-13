
import {createContext} from 'react'

const defaultUserState = {
    role: '',
    username: '',
    isLoggedIn: false
};

const {Consumer: UserConsumer, Provider : UserProvider} = createContext(defaultUserState);

export  {
    UserConsumer,
    UserProvider,
    defaultUserState
}