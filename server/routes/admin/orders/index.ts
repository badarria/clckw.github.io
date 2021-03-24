import { getFiltered, getKeys, getList, remove, update, add } from './requests'
import { checkAdminToken } from '../../../utils'
import { Router } from 'express'
const index = Router()

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, getList)
index.get('/filtered', getFiltered)
index.get('/foreignKeys', checkAdminToken, getKeys)
index.put('/', checkAdminToken, update)
index.post('/', checkAdminToken, add)
index.delete('/:id', checkAdminToken, remove)

export { index }
