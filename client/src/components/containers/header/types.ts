import { City, TypicalResponseType } from 'types'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { ReactElement } from 'react'

export type LocalSignIn = { email: string; password: string }
export type GoogleSignIn = GoogleLoginResponse | GoogleLoginResponseOffline
export type SignInDialogProps = {
  msg: string
  open: boolean
  close: () => void
  localSignIn: (data: LocalSignIn) => void
  googleSignIn: (data: GoogleSignIn) => void
  changeState: (data: boolean) => void
}
export type UserState = { msg: string; role: string; name: string } | TypicalResponseType

export type SignRes = { token: string; role: string; id: number; name: string } | TypicalResponseType
export type SignUpDialog1Props = {
  change: () => void
  msg: string
  localSignUp: (data: LocalSignUp) => void
  gglBtn: ReactElement
}

export type GoogleBtnProps = { cb: (data: GoogleSignIn) => void; label: string }
export type SignUpDialogProps = {
  msg: string
  open: boolean
  close: () => void
  googleSignUp: ({ token, isMaster, city }: GoogleSignUp) => void
  localSignUp: (data: LocalSignUp) => void
  changeState: (data: boolean) => void
}

export type SignUpGoogleForm = { master: boolean; agree: boolean; city: { id: number; name: string } }

export type SignUpDialog2Props = {
  msg: string
  change: () => void
  submit: (data: SignUpGoogleForm) => void
}

export type GoogleSignUp = { token: string; isMaster: boolean; city: City }
export type LocalSignUp = {
  city: City
  password: string
  email: string
  name: string
  surname: string
  confirmPassword: string
  agree: boolean
  master: boolean
}

export type FbRes = {
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
export type FacebookBtnProps = { cb: (data: FbRes) => void }
