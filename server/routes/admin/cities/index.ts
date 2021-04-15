import { Router } from 'express'
const index = Router()
import { checkAdminToken } from '../../shared/utils'
import { update, get, remove, add } from './func'

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, get)
index.put('/', checkAdminToken, update)
index.delete('/:id', checkAdminToken, remove)
index.post('/', checkAdminToken, add)

export { index }
