const registerValidation = (
    username,
    email,
    password,
    confirmPassword
) => {
    let validEmail = (() => {
        let mailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        let testMail = mailRegex.test(email);
        return testMail && email !== '' && email.length < 36;

    })();

    let validUsername = (() => {
        return username.length > 3 && username.length < 16 &&
            username !== '';

    })();

    let validPassword = (() => {
        return password.length > 7 && password.length < 21 &&
            password !== '';

    })();

    let validConfirmPassword = (() => {
        return confirmPassword.length > 7 && confirmPassword.length < 21 &&
            confirmPassword !== '' &&
            confirmPassword === password;

    })();

    return {
        validEmail,
        validUsername,
        validPassword,
        validConfirmPassword
    }
};

const loginValidation = (username, password) => {
    let validUsername = (() => {
        return username.length > 3 && username.length < 16 &&
            username !== '';
    })();

    let validPassword = (() => {
        return password.length > 7 && password.length < 21 &&
            password !== '';

    })();

    return {
        validUsername,
        validPassword
    }
};

const dateValidation = (startDate, endDate) => {

    const currentDateTime = new Date(Date.now()).setHours(0,0,0,0);
    const startDateTime = new Date(startDate).setHours(0,0,0,0);
    const endDateTime = new Date(endDate).setHours(0,0,0,0);

    let validStartDate = (() => {
        return startDateTime >= currentDateTime && startDateTime <= endDateTime;
    })();

    let validEndDate = (() => {
        return endDateTime >= currentDateTime && startDateTime <= endDateTime;
    })();

    return {
        validStartDate,
        validEndDate
    }
};

const createCarValidation = (brand, model, count, seats, year, fuelExpense, description, imageUrl, trunkCapacity, pricePerDay) => {
    let validBrand = (() => {
        return brand.length > 2 &&
            brand.length < 15 &&
            brand !== '';
    })();

    let validModel = (() => {
        return brand !== '';
    })();


    let validDescription = (() => {
        return description.length > 10 &&
            description.length < 500 &&
            description !== '';
    })();

    let validImage = (() => {
        return (imageUrl.startsWith('https://') || imageUrl.startsWith('http://')) && imageUrl.length >= 10;

    })();

    let validTrunkCapacity = (() => {
        return trunkCapacity !== '';

    })();

    let validPrice = (() => {
        return pricePerDay > 0 &&
            pricePerDay !== '';

    })();

    let validCount = (() => {
        return count > 0 &&
            count !== '';
    })();

    let validYear = (() => {
        return year > 0 &&
            year !== '';
    })();

    let validSeats = (() => {
        return seats > 0 &&
            seats !== '';
    })();

    let validFuelExpense = (() => {
        return fuelExpense > 0 &&
            fuelExpense !== '';
    })();

    return {
        validBrand,
        validModel,
        validDescription,
        validImage,
        validTrunkCapacity,
        validPrice,
        validSeats,
        validYear,
        validFuelExpense,
        validCount
    }
};

export {
    registerValidation,
    loginValidation,
    createCarValidation,
    dateValidation
}