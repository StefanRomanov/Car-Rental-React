import fetcher from "../data/fetcher";
import config from "../config/server-config";

export default {
    findAvailableCars,
    getCarById,
    editCar,
    createCar,
    getAllCars

}

function findAvailableCars(dates){
    return fetcher.post(config.SERVER_PATH + "/cars/available", dates)
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

function getAllCars(){
    return fetcher.get(config.SERVER_PATH + '/cars/all')
}