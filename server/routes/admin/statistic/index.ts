import { chart1ByDays, chart1ByWeeks, chart1ByMonth, chart1Init, chart2, chart3, chart4, chart4Init } from './requests'
import { Router } from 'express'
import { checkAdminToken } from '../../../routes/shared/utils'
const index = Router()

index.get('/chart1Days/:begin/:finish', checkAdminToken, chart1ByDays)
index.get('/chart1Months/:begin/:finish', checkAdminToken, chart1ByMonth)
index.get('/chart1Weeks/:begin/:finish', checkAdminToken, chart1ByWeeks)
index.get('/chart1Init', checkAdminToken, chart1Init)
index.get('/chart2/:begin/:finish', checkAdminToken, chart2)
index.get('/chart3/:begin/:finish', checkAdminToken, chart3)
index.get('/chart4/:begin/:finish/:limit/:offset/:orderby/:order', checkAdminToken, chart4)
index.get('/chart4Init', checkAdminToken, chart4Init)

export { index }
