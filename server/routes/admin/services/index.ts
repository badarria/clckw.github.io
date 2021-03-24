import { checkAdminToken } from '../../../utils'
import { update, getList, remove, add } from './requests'
import { Router } from 'express'
const index = Router()

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, getList)
index.put('/', checkAdminToken, update)
index.delete('/:id', checkAdminToken, remove)
index.post('/', checkAdminToken, add)

export { index }
