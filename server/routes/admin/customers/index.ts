import { Router } from 'express'
const index = Router()
import { getList, update, remove, add } from './requests'
import { checkAdminToken } from '../../../utils'

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, getList)
index.put('/', checkAdminToken, update)
index.delete('/:id', checkAdminToken, remove)
index.post('/', checkAdminToken, add)

export { index }
