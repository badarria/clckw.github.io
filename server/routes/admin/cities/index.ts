import {Router} from 'express'
const index = Router()
import { checkToken } from '../../../utils'
import { update, getList, remove, add } from './requests'

index.get('/:limit/:offset/:order/:orderby', checkToken(), getList)
index.put('/', checkToken(), update)
index.delete('/:id', checkToken(), remove)
index.post('/', checkToken(), add)

export { index }
