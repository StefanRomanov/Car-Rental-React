import fetcher from './fetcher'
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
}

function approvedRents(pageString){
    return fetcher.get(config.SERVER_PATH + "/rents/approved" + pageString)
}

function pendingRents(pageString){
    return fetcher.get(config.SERVER_PATH + "/rents/unapproved" + pageString)
}

function activeRents(pageString){
    return fetcher.get(config.SERVER_PATH + "/rents/active" + pageString);
}

function reserve(carId,dates){
    return fetcher.post(config.SERVER_PATH + "/cars/reserve/" + carId, dates)
}

function declineRent(id){
    return fetcher.post(config.SERVER_PATH + "/rents/decline/" + id);
}

function finishRent(id, body){
    return fetcher.post(config.SERVER_PATH + "/rents/finish/" + id, body);
}


