import {
  histogramByDays,
  histogramByWeeks,
  histogramByMonth,
  histogramInit,
  diagramByCities,
  diagramByMasters,
  tableByMasters,
  tableByMastersInit,
} from './requests'
import { Router } from 'express'
import { checkAdminToken } from '../../../routes/shared/utils'
const index = Router()

index.get('/histogramDays/:begin/:finish', checkAdminToken, histogramByDays)
index.get('/histogramMonths/:begin/:finish', checkAdminToken, histogramByMonth)
index.get('/histogramWeeks/:begin/:finish', checkAdminToken, histogramByWeeks)
index.get('/histogramInit', checkAdminToken, histogramInit)
index.get('/citiesDiagram/:begin/:finish', checkAdminToken, diagramByCities)
index.get('/mastersDiagram/:begin/:finish', checkAdminToken, diagramByMasters)
index.get('/tableByMasters/:begin/:finish/:limit/:offset/:orderby/:order', checkAdminToken, tableByMasters)
index.get('/tableByMastersInit', checkAdminToken, tableByMastersInit)

export { index }
