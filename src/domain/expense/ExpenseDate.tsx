export const isDateValid = (date: string): boolean => {
    const today = new Date();
    const todayIsoString = today.toISOString().split("T")[0];
    return todayIsoString >= date && date.length > 0;
}