require('dotenv').config()
import path from 'path'
import express from 'express'
const app = express()
const env: Env = app.get('env')
type Env = 'production' | 'development'

const allConfig = {
  production: {
    db: process.env.DATABASE_URL || '',
    dbOpt: { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } },
    port: process.env.PORT,
    app: express.static(path.join(__dirname, '../client/build')),
    mailing: {
      password: process.env.MAIL_PASSWORD,
      email: process.env.MAIL_ADRESS,
      baseUrl: 'https://test-clckw.herokuapp.com',
    },
    cloudinary: {
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    },
    jwt: process.env.JWT_SECRET || '',
    stripe: { publish_key: process.env.STRIPE_PUBLISH_KEY || '', secret_key: process.env.STRIPE_SECRET_KEY || '' },
    facebook: { client_id: process.env.CLIENT_ID_FB || '', secret_id: process.env.CLIENT_SECRET_FB || '' },
    google: {
      client_id: process.env.CLIENT_ID_GOOGLE_OAUTH || '',
      client_secret: process.env.CLIENT_SECRET_GOOGLE_OAUTH || '',
    },
  },
  development: {
    db: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
    port: 5000,
    mailing: {
      password: process.env.MAIL_PASSWORD,
      email: process.env.MAIL_ADRESS,
      baseUrl: 'http://localhost:3000',
    },
    app: express.static(path.join(__dirname, '../client/build')),
    cloudinary: {
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    },
    facebook: { client_id: process.env.CLIENT_ID_FB || '', secret_id: process.env.CLIENT_SECRET_FB || '' },
    google: {
      client_id: process.env.CLIENT_ID_GOOGLE_OAUTH || '',
      client_secret: process.env.CLIENT_SECRET_GOOGLE_OAUTH || '',
    },
    jwt: process.env.JWT_SECRET || '',
    stripe: { publish_key: process.env.STRIPE_PUBLISH_KEY || '', secret_key: process.env.STRIPE_SECRET_KEY || '' },
  },
}

export const config = allConfig[env]
