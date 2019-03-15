import toastr from 'toastr';//

const loginFormHandler = (username, password) => {
    if (username.length < 4 || username === '') {
        toastr.error('Username should be at least 4 characters long');
        return false
    }

    if (password.length < 8 || password === '') {
        toastr.error('Password should be at least 8 characters long');
        return false
    }

    return true
};

const registerHandler = (username, email, password, confirmPassword) => {
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (username.length < 4 || username === '') {
        toastr.error('Username should be at least 4 characters long');
        return false
    }
    if (!emailRegex.test(email) || email === '') {
        toastr.error('Please enter correct email address');
        return false
    }
    if (password.length < 8 || password === '') {
        toastr.error('Password should be at least 8 characters long');
        return false
    }
    if (password !== confirmPassword) {
        toastr.error('Passwords do not match');
        return false
    }

    return true
};

const dateHandler = (startDate, endDate) => {
    const currentDateTime = new Date(Date.now()).setHours(0, 0, 0, 0);
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateTime = new Date(endDate).setHours(0, 0, 0, 0);

    if (startDateTime < currentDateTime) {
        toastr.error('Please dont use past dates');
        return false
    }

    if (endDateTime < currentDateTime) {
        toastr.error('Please dont use past dates');
        return false
    }

    if(startDateTime > endDateTime){
        toastr.error('End date cannot be before start date');
        return false
    }

    return true;

};

const createCarHandler = (brand, model, count, seats, year, fuelExpense, description, imageUrl, trunkCapacity, pricePerDay) => {
    if (brand.length < 3 || brand === '' || brand.length > 15) {
        toastr.error('Brand should be between 3 and 15 characters long');
        return false
    }

    if (model.length === 0 || model === '' || model.length > 15) {
        toastr.error('Model should be between 1 and 15 characters long');
        return false
    }

    if (count < 1 || count === '') {
        toastr.error('Count should be at least 1');
        return false
    }

    if (seats < 1 || seats === '') {
        toastr.error('Seats should be at least 1');
        return false
    }

    if (year < 1 || year === '') {
        toastr.error('Year should be at least 1');
        return false
    }

    if (description.length < 10 ||
        description.length > 500 ||
        description === '') {
        toastr.error('Description should be between 10 and 500 characters');
        return false
    }

    if (imageUrl.length < 14 || !(imageUrl.startsWith('https://') || imageUrl.startsWith('http://'))) {
        toastr.error('Please enter valid image url');
        return false
    }

    if (trunkCapacity < 1 || trunkCapacity === '') {
        toastr.error('Trunk capacity should be at least 1');
        return false
    }

    if (pricePerDay < 0.01 || pricePerDay === '') {
        toastr.error('Price should be higher than 0');
        return false
    }

    if (fuelExpense < 0.01 || fuelExpense === '') {
        toastr.error('Fuel expense should be higher than 0');
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