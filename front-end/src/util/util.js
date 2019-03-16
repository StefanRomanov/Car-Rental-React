function getDaysBetween(firstDate, secondDate) {
    let ONE_DAY = 1000 * 60 * 60 * 24;

    let date1_ms = firstDate.getTime();
    let date2_ms = secondDate.getTime();

    let difference_ms = Math.abs(date1_ms - date2_ms);

    return Math.round(difference_ms / ONE_DAY) + 1;
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(dateString) {
    let date = new Date(dateString);

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

export default {getDaysBetween, getCurrentDate, formatDate};