import { getFiltered, getKeys, get, remove, update, add, findMasters, findCustomers, getInitFilter } from './requests'
import { checkAdminToken } from '../../shared/utils'
import { Router } from 'express'
const index = Router()

index.get('/', checkAdminToken, get)
index.get('/filtered', getFiltered)
index.get('/foreignKeys', checkAdminToken, getKeys)
index.put('/', checkAdminToken, update)
index.post('/', checkAdminToken, add)
index.delete('/:id', checkAdminToken, remove)
index.get('/findMastersByText/:str', checkAdminToken, findMasters)
index.get('/findCustomersByText/:str', checkAdminToken, findCustomers)
index.get('/initFilterData', checkAdminToken, getInitFilter)

export { index }
