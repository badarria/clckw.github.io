import { Router } from 'express'
import { index as customers } from './admin/customers'
import { index as masters } from './admin/masters'
import { index as cities } from './admin/cities'
import { index as orders } from './admin/orders'
import { index as services } from './admin/services'
import { index as homePage } from './home'
import { index as ratingPage } from './rating'
import { index as masterPage } from './master'

const index = Router()

index.use('/home', homePage)
index.use('/rating', ratingPage)
index.use('/master', masterPage)
index.use('/admin/customers', customers)
index.use('/admin/masters', masters)
index.use('/admin/cities', cities)
index.use('/admin/orders', orders)
index.use('/admin/services', services)

export { index }
