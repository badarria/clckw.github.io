import { Router } from 'express'
const index = Router()
import { get, update, remove, add } from './func'
import { checkAdminToken } from '../../shared/utils'

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, get)
index.put('/', checkAdminToken, update)
index.delete('/:id', checkAdminToken, remove)
index.post('/', checkAdminToken, add)

export { index }
