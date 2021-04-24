import { downloadImg, savePost } from './requests'
import { Router } from 'express'
import { checkAdminToken } from '../../../routes/shared/utils'
const index = Router()

index.post('/download', checkAdminToken, downloadImg)
index.post('/savePost', checkAdminToken, savePost)

export { index }
