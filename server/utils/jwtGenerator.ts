import { verify, sign, VerifyErrors } from 'jsonwebtoken'
import { config } from '../../config'

export const jwtGenerator = (id: string) => {
  if (config.jwt) return sign(id, config.jwt)
}

export const jwtDecode = (token: string) => {
  const result = verify(token, config.jwt, (err, decoded) => err || decoded) as VerifyErrors | string | undefined
  if (result) return result
}
