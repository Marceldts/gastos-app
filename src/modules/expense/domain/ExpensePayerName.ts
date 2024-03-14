import { isUserNameValid } from 'modules/user/domain/UserName'

export const isPayerNameValid = (payerName: string): boolean => {
  isUserNameValid(payerName)
  return true
}
