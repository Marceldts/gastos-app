export const isUserNameValid = (name: string): boolean => {
    const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜçÇ\s]+$/
    return name.trim().length > 0 && regex.test(name.trim());
}