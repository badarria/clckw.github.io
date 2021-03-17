import { Router } from 'express'
const index = Router()
import { update, add, remove, getList, getKeys } from './requests'
import { checkToken } from '../../../utils'

index.get('/:limit/:offset/:order/:orderby', checkToken(), getList)
index.get('/foreignKeys', checkToken(), getKeys)
index.put('/', checkToken(), update)
index.post('/', checkToken(), add)
index.delete('/:id', checkToken(), remove)

export { index }
