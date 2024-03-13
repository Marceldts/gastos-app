import { isUserNameValid } from 'user/domain/UserName'

export const isPayerNameValid = (payerName: string): boolean => {
  isUserNameValid(payerName)
  return true
}
