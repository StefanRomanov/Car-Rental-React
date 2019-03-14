import fetcher from "./fetcher";
import config from "../config/server-config";

function getSalesByUsername(username){
    return fetcher.get(config.SERVER_PATH + '/sales/all/' + username)
}

export default {
    getSalesByUsername
}