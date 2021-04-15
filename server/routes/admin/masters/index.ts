import { Router } from 'express'
import { update, add, remove, get, getKeys } from './func'
import { checkAdminToken } from '../../shared/utils'
const index = Router()

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, get)
index.get('/foreignKeys', checkAdminToken, getKeys)
index.put('/', checkAdminToken, update)
index.post('/', checkAdminToken, add)
index.delete('/:id', checkAdminToken, remove)

export { index }
