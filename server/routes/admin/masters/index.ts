import { Router } from 'express'
const index = Router()
import { update, add, remove, getList, getKeys } from './requests'
import { checkAdminToken } from '../../../utils'

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, getList)
index.get('/foreignKeys', checkAdminToken, getKeys)
index.put('/', checkAdminToken, update)
index.post('/', checkAdminToken, add)
index.delete('/:id', checkAdminToken, remove)

export { index }
