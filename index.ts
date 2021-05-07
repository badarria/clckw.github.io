import express from 'express'
import cors from 'cors'
import { index as routes } from './server/routes'
import path from 'path'
import { config } from './config'
import { Request, Response } from 'express'
import { errorsHandler } from './server/errors-handler'
import ordersRemind from './server/cron/orders-remind'

const app = express()

const PORT = config.port
ordersRemind.start()

app.use(cors())
app.use(express.json({ limit: '10Mb' }))

app.use('/', routes)

app.use(errorsHandler)

if ('app' in config) {
  app.use(config.app)
}

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}..`)
})
