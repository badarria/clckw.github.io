import { City, TypicalResponseType } from 'types'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { ReactElement } from 'react'

export type LocalSignInDtT = { email: string; password: string }
export type GglSignInDtT = GoogleLoginResponse | GoogleLoginResponseOffline
export type SignInDialogPrT = {
  msg: string
  open: boolean
  close: () => void
  localSignIn: (data: LocalSignInDtT) => void
  gglSignIn: (data: GglSignInDtT) => void
  changeState: (data: boolean) => void
}
export type UserStateDtT = { msg: string; role: string; name: string } | TypicalResponseType

export type SignInResDtT = { token: string; role: string; id: number; name: string } | TypicalResponseType
export type SignUpDialog1PrT = {
  change: () => void
  msg: string
  localSignUp: (data: LocalSignUpDtT) => void
  gglBtn: ReactElement
}

export type SignUpGglBtnPrT = { cb: (data: GglSignInDtT) => void; label: string }
export type SignUpDialogPrT = {
  msg: string
  open: boolean
  close: () => void
  gglSignUp: ({ token, isMaster, city }: GglSignUpDtT) => void
  localSignUp: (data: LocalSignUpDtT) => void
  changeState: (data: boolean) => void
}

export type SignUpGglFormDtT = { master: boolean; agree: boolean; city: { id: number; name: string } }

export type SignUpDialog2PrT = {
  msg: string
  change: () => void
  submit: (data: SignUpGglFormDtT) => void
}

export type GglSignUpDtT = { token: string; isMaster: boolean; city: City }
export type LocalSignUpDtT = {
  city: City
  password: string
  email: string
  name: string
  surname: string
  confirmPassword: string
  agree: boolean
  master: boolean
}

export type FbResDtT = {
  accessToken: string
  data_access_expiration_time: number
  email: string
  expiresIn: number
  graphDomain: string
  id: string
  name: string
  signedRequest: string
  userID: string
}
export type FacebookBtnPrT = { cb: (data: FbResDtT) => void }
