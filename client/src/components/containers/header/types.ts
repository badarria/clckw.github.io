import { City, Response } from 'types'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

export type LocalSignIn = { email: string; password: string }
export type GoogleSignIn = GoogleLoginResponse | GoogleLoginResponseOffline | GoogleFailure

export type SignRes = { token: string; role: string; id: number; name: string } | Response

export type SignUpGoogleForm = { master: boolean; agree: boolean; city: { id: number; name: string } }

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

export type GoogleFailure = { details: string; error: string }
