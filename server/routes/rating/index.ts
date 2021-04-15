import { getOrder, setRating } from './func'
import { Router } from 'express'
const index = Router()

index.get('/getOrder/:id', getOrder)
index.put('/setRating', setRating)

export { index }
