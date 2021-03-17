import { getOrderToRate, setOrderRating } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/getOrder/:orderId', getOrderToRate)
index.put('/setRating', setOrderRating)

export { index }
