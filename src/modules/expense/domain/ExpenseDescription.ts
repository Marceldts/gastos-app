export const isDescriptionValid = (description: string): boolean => {
  return description.trim().length > 0 && description.trim().length <= 50
}

export class ExpenseDescriptionError extends Error {
  constructor() {
    super(`Description is not valid.\n`)
  }
}
