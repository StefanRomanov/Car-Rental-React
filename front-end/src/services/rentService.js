import fetcher from '../data/fetcher'
import config from "../config/server-config";

export default {
    approveRent,
    approvedRents,
    pendingRents,
    activeRents,
    reserve,
    declineRent,
    finishRent
}

function approveRent(id){
    return fetcher.post(config.SERVER_PATH + "/rents/approve/" + id)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}

function approvedRents(){
    return fetcher.get(config.SERVER_PATH + "/rents/approved")
}

function pendingRents(){
    return fetcher.get(config.SERVER_PATH + "/rents/unapproved")
}

function activeRents(){
    return fetcher.get(config.SERVER_PATH + "/rents/active");
}

function reserve(carId,dates){
    return fetcher.post(config.SERVER_PATH + "/rents/reserve/" + carId, dates)
}

function declineRent(id){
    return fetcher.post(config.SERVER_PATH + "/rents/decline/" + id);
}

function finishRent(id, body){
    return fetcher.post(config.SERVER_PATH + "/rents/finish/" + id, body);
}


