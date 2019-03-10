import fetcher from "../data/fetcher";
import config from "../config/server-config";

export default{
    login,
    register
}

function login(data){
    return fetcher.post(config.SERVER_PATH + "/login", data);
}

function register(data){
    return fetcher.post(config.SERVER_PATH + "/users/register", data)
}