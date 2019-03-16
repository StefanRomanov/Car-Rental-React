import fetcher from "./fetcher";
import config from "../config/server-config";

export default {
    findAvailableCars,
    getCarById,
    editCar,
    createCar,
    getAllCars,
    checkAvailability

}

function findAvailableCars(pageString, searchString,dates){
    return fetcher.post(config.SERVER_PATH + "/cars/available"+ pageString +  searchString, dates)
}

function getCarById(id){
    return fetcher.get(config.SERVER_PATH + '/cars/' + id)
}

function editCar(id, body){
    return fetcher.post(config.SERVER_PATH + "/cars/edit/" + id, body)
}

function createCar(body){
    return fetcher.post(config.SERVER_PATH + "/cars/create", body)

}

function getAllCars(pageString, searchString){
    return fetcher.get(config.SERVER_PATH + '/cars/all' + pageString + searchString)
}

function checkAvailability(id ,startDate, endDate){
    return fetcher.post(config.SERVER_PATH + '/cars/check/' +id, {startDate,endDate})
}