import { chart1ByDays, chart1ByWeeks, chart1ByMonth } from './requests'
import { Router } from 'express'
import { checkAdminToken } from 'routes/shared/utils'
const index = Router()

index.get('/chart1Days/:begin/:finish', chart1ByDays)
index.get('/chart1Months/:begin/:finish', chart1ByMonth)
index.get('/chart1Weeks/:begin/:finish', chart1ByWeeks)

export { index }
