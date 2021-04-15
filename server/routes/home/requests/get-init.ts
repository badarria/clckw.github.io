import { City, Service } from '../../../db/models'
import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
  const city = await City.findAll().catch((err: Error) => new Error(err.message))
  const service = await Service.findAll().catch((err: Error) => new Error(err.message))

  return city && service && res.json({ city, service })
}
