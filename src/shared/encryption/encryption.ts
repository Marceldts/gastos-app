import * as CryptoJs from 'crypto-js'

const _KEY = 'Pru€b@Aut€nti@'

export const encrypt = (data: string): string => {
  return CryptoJs.AES.encrypt(data, _KEY).toString()
}

export const decrypt = (data: string): string => {
  return CryptoJs.AES.decrypt(data, _KEY).toString(CryptoJs.enc.Utf8)
}
