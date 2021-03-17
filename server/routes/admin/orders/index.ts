import { getFiltered, getKeys, getList, remove, update, add } from './requests'
import { checkToken } from '../../../utils'
import { Router } from 'express'
const index = Router()

index.get('/:limit/:offset/:order/:orderby', checkToken(), getList)
index.get('/filtered', getFiltered)
index.get('/foreignKeys', checkToken(), getKeys)
index.put('/', checkToken(), update)
index.post('/', checkToken(), add)
index.delete('/:id', checkToken(), remove)

export { index }
