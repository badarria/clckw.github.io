import { checkToken, sendMail } from './../../utils'
import { getOrders, changeStatus, ratingRequestMail } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkToken(), getOrders)
index.put('/status', checkToken(), changeStatus)
index.post('/sendMail', checkToken(), ratingRequestMail, sendMail())

export { index }
