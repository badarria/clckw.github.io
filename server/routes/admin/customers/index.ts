import { Router } from 'express'
const index = Router()
import { getList, update, remove, add } from './requests'
import { checkToken } from '../../../utils'

index.get('/:limit/:offset/:order/:orderby', checkToken(), getList)
index.put('/', checkToken(), update)
index.delete('/:id', checkToken(), remove)
index.post('/', checkToken(), add)

export { index }
