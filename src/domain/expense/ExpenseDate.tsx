export const isDateValid = (date: String): boolean => {
    const today = new Date();
    const todayIsoString = today.toISOString().split("T")[0];
    return todayIsoString >= date && date.length > 0;
}