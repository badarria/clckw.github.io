import { checkCustomerToken } from '../shared/utils'
import { getOrders, setRating } from './func'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkCustomerToken, getOrders)
index.put('/rating', checkCustomerToken, setRating)

export { index }
