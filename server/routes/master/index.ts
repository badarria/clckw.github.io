import { checkMasterToken, sendMail } from '../shared/utils'
import { getOrders, changeStatus, createMail, getPhotos, downloadPdf } from './func'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkMasterToken, getOrders)
index.put('/status', checkMasterToken, changeStatus)
index.post('/sendMail', checkMasterToken, createMail, sendMail())
index.get('/getPhotos/:id', checkMasterToken, getPhotos)
index.get('/downloadPdf/:id', downloadPdf)

export { index }
