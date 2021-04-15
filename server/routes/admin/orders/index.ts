import { getFiltered, getKeys, get, remove, update, add } from './requests'
import { checkAdminToken } from '../../shared/utils'
import { Router } from 'express'
const index = Router()

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, get)
index.get('/filtered', getFiltered)
index.get('/foreignKeys', checkAdminToken, getKeys)
index.put('/', checkAdminToken, update)
index.post('/', checkAdminToken, add)
index.delete('/:id', checkAdminToken, remove)

export { index }
