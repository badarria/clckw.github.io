import { User } from '../types'

export const getUserAuthState = (state: { user: User }) => state.user
