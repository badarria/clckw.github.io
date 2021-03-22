import { getOrderToRate, setOrderRating } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/getOrder/:id', getOrderToRate)
index.put('/setRating', setOrderRating)

export { index }
