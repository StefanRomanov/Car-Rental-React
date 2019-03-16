import toastr from 'toastr';
import constants from '../constants'

const loginFormHandler = (username, password) => {
    if (username.length < 4 || username.length > 16 || username === '') {
        toastr.error(constants.USERNAME_ERROR);
        return false
    }

    if (password.length < 8 || password.length > 21 || password === '') {
        toastr.error(constants.PASSWORD_ERROR);
        return false
    }

    return true
};

const registerHandler = (username, email, password, confirmPassword) => {
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (username.length < 4 || username.length > 16 || username === '') {
        toastr.error(constants.USERNAME_ERROR);
        return false
    }
    if (!emailRegex.test(email) || email.length > 36 || email === '') {
        toastr.error(constants.EMAIL_ERROR);
        return false
    }
    if (password.length < 8 || password.length > 21 || password === '') {
        toastr.error(constants.PASSWORD_ERROR);
        return false
    }
    if (password !== confirmPassword) {
        toastr.error(constants.PASSWORD_DONT_MATCH);
        return false
    }

    return true
};

const dateHandler = (startDate, endDate) => {
    const currentDateTime = new Date(Date.now()).setHours(0, 0, 0, 0);
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateTime = new Date(endDate).setHours(0, 0, 0, 0);

    if (startDateTime < currentDateTime) {
        toastr.error(constants.PAST_DATE_ERROR);
        return false
    }

    if (endDateTime < currentDateTime) {
        toastr.error(constants.PAST_DATE_ERROR);
        return false
    }

    if(startDateTime > endDateTime){
        toastr.error(constants.END_DATE_BEFORE_START);
        return false
    }

    return true;

};

const createCarHandler = (brand, model, count, seats, year, fuelExpense, description, imageUrl, trunkCapacity, pricePerDay) => {
    if (brand.length < 3 || brand === '' || brand.length > 15) {
        toastr.error(constants.CAR_BRAND_ERROR);
        return false
    }

    if (model.length === 0 || model === '' || model.length > 15) {
        toastr.error(constants.CAR_MODEL_ERROR);
        return false
    }

    if (count < 1 || count === '') {
        toastr.error(constants.CAR_COUNT_ERROR);
        return false
    }

    if (seats < 1 || seats === '') {
        toastr.error(constants.CAR_SEAT_ERROR);
        return false
    }

    if (year < 1 || year === '') {
        toastr.error(constants.CAR_YEAR_ERROR);
        return false
    }

    if (description.length < 10 ||
        description.length > 500 ||
        description === '') {
        toastr.error(constants.CAR_DESCRIPTION_ERROR);
        return false
    }

    if (imageUrl.length < 14 || !(imageUrl.startsWith('https://') || imageUrl.startsWith('http://'))) {
        toastr.error(constants.CAR_IMAGE_ERROR);
        return false
    }

    if (trunkCapacity < 1 || trunkCapacity === '') {
        toastr.error(constants.CAR_TRUNK_ERROR);
        return false
    }

    if (pricePerDay < 0.01 || pricePerDay === '') {
        toastr.error(constants.CAR_PRICE_ERROR);
        return false
    }

    if (fuelExpense < 0.01 || fuelExpense === '') {
        toastr.error(constants.CAR_FUEL_ERROR);
        return false
    }

    return true
};

export {
    loginFormHandler,
    registerHandler,
    createCarHandler,
    dateHandler
}