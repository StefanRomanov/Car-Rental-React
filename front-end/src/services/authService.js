import fetcher from "./fetcher";
import config from "../config/server-config";
import decode from 'jwt-decode';

export default {
    login,
    register,
    logout,
    decodeToken
}

function login(data) {
    return fetcher.post(config.SERVER_PATH + "/login", data)

}

function register(data) {
    return fetcher.post(config.SERVER_PATH + "/users/register", data)

}

function logout(){
    window.localStorage.clear();
}

function decodeToken(token){
    return decode(token);
}