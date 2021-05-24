import { getFiltered, getKeys, get, remove, update, add, findMasters, findCustomers } from './requests'
import { checkAdminToken } from '../../shared/utils'
import { Router } from 'express'
const index = Router()

index.get('/:limit/:offset/:order/:orderby', checkAdminToken, get)
index.get('/filtered', getFiltered)
index.get('/foreignKeys', checkAdminToken, getKeys)
index.put('/', checkAdminToken, update)
index.post('/', checkAdminToken, add)
index.delete('/:id', checkAdminToken, remove)
index.get('/findMastersByText/:str', checkAdminToken, findMasters)
index.get('/findCustomersByText/:str', checkAdminToken, findCustomers)

export { index }
