import { checkToken } from './../../utils/checkToken'
import { getOrders } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/:id/:limit/:offset/:order/:orderby', checkToken(), getOrders)

export { index }
