//We format the date to 'sv-SE' to get a string with the format YYYY-MM-DD
const _getTodaysDate = (): string => {
  return Intl.DateTimeFormat('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
}

export const today = _getTodaysDate()
