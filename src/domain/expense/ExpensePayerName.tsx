import { isUserNameValid } from 'domain/user/UserName'

export const isPayerNameValid = (payerName: string): boolean => {
  isUserNameValid(payerName)
  return true
}
