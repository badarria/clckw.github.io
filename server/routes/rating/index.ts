import { getOrder, setRating } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/getOrder/:id', getOrder)
index.put('/setRating', setRating)

export { index }
