import { User } from '../types'

export const getUserAuthState = (state: { user: User }) => state.user
export const getCheckingState = (state: { checking: boolean }) => state.checking
