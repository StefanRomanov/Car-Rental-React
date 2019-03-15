import fetcher from "./fetcher";
import config from "../config/server-config";

function getSalesByUsername(pageString,username,searchString){
    return fetcher.get(config.SERVER_PATH + '/sales/all/' + username + pageString + searchString)
}

export default {
    getSalesByUsername
}