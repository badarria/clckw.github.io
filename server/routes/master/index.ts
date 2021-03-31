import { checkMasterToken, sendMail } from './../../utils'
import { getOrders, changeStatus, ratingRequestMail, getPhotos } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkMasterToken, getOrders)
index.put('/status', checkMasterToken, changeStatus)
index.post('/sendMail', checkMasterToken, ratingRequestMail, sendMail())
index.get('/getPhotos/:id', checkMasterToken, getPhotos)

export { index }
