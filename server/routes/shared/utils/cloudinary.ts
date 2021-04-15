import cloudinary from 'cloudinary'
import { config } from '../../../../config'

const { cloud_name, api_key, api_secret } = config.cloudinary
cloudinary.v2.config({ cloud_name, api_key, api_secret })

export { cloudinary }
