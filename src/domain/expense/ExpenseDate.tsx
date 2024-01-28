export const isDateValid = (date: string): boolean => {
    return dateIsNotAfterToday(date) && isISOString(date);
}

const dateIsNotAfterToday = (date: string): boolean => {
    const today = new Date();
    const todayIsoString = today.toISOString().split("T")[0];
    return todayIsoString >= date && date.length > 0;
}

const isISOString = (dateString: string): boolean => {
    const isoFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return isoFormatRegex.test(dateString);
};