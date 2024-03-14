export const isUserNameValid = (name: string): boolean => {
  return nameIsNotEmpty(name) && nameIsNotMoreThan50Characters(name) && nameMatchesRegex(name)
}

const nameMatchesRegex = (name: string): boolean => {
  const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜçÇ\s]+$/
  return regex.test(name.trim())
}

const nameIsNotEmpty = (name: string): boolean => {
  return name.trim().length > 0
}

const nameIsNotMoreThan50Characters = (name: string): boolean => {
  return name.trim().length <= 50
}
