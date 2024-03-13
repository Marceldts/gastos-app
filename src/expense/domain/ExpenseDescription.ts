export const isDescriptionValid = (description: string): boolean => {
  return description.trim().length > 0 && description.trim().length <= 50
}
