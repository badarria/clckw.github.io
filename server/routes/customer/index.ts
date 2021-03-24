import { checkCustomerToken } from './../../utils'
import { getOrders } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkCustomerToken, getOrders)

export { index }
