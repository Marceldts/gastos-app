export const isUserNameValid = (name: string): boolean => {
  return _nameIsNotEmpty(name) && _nameIsNotMoreThan50Characters(name) && _nameMatchesRegex(name)
}

export class UserNameError extends Error {
  constructor() {
    super(`Name is not valid.\n`)
  }
}

const _nameMatchesRegex = (name: string): boolean => {
  const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜçÇ\s]+$/
  return regex.test(name.trim())
}

const _nameIsNotEmpty = (name: string): boolean => {
  return name.trim().length > 0
}

const _nameIsNotMoreThan50Characters = (name: string): boolean => {
  return name.trim().length <= 50
}
