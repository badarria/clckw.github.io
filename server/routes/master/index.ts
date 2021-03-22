import { checkToken, sendMail } from './../../utils'
import { getOrders, changeStatus, ratingRequestMail, getResponse } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkToken(), getOrders)
index.put('/status', checkToken(), changeStatus, ratingRequestMail, sendMail(), getResponse)

export { index }
