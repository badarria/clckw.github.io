import { config } from './../../../config'
import bcrypt from 'bcrypt'
import { Master, Customer, User } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { googleRegDataSchema, googleTokenSchema, localDataSchema, loginFormSchema } from '../../validation'
import { v4 } from 'uuid'
import { OAuth2Client } from 'google-auth-library'
import * as genPass from 'generate-password'
const fb = config.facebook
const google = config.google
const client = new OAuth2Client(google.client_id)

const getUserByRole = async (role: string, token: string, id: number) => {
  let userId = 0,
    name = 'admin'
  if (role === 'master') {
    const master = await Master.findOne({ include: { model: User, where: { id } } }).catch((err) => err)
    master && (userId = master.id) && (name = master.fullName)
  }
  if (role === 'customer') {
    const customer = await Customer.findOne({ include: { model: User, where: { id } } }).catch((err) => err)
    customer && (userId = customer.id) && (name = customer.fullName)
  }
  return { id: userId, role, token, name }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await loginFormSchema.validate(req.body).catch((err) => next(err))

  if (validData) {
    const { email, password } = validData
    const user = await User.findOne({ where: { email } }).catch((err) => next(err))
    if (user) {
      const { id, salt, pass, token, role } = user
      const bcryptPassword = await bcrypt.hash(password, salt).catch((err) => next(err))
      const isMatch = bcryptPassword === pass

      if (isMatch) {
        const userByRole = await getUserByRole(role, token, id).catch((err) => next(err))
        return res.json(userByRole)
        // let userId = 0,
        //   name = 'admin'
        // if (role === 'master') {
        //   const master = await Master.findOne({ include: { model: User, where: { id } } }).catch((err) => next(err))
        //   master && (userId = master.id) && (name = master.fullName)
        // }
        // if (role === 'customer') {
        //   const customer = await Customer.findOne({ include: { model: User, where: { id } } }).catch((err) => next(err))
        //   customer && (userId = customer.id) && (name = customer.fullName)
        // }
        // return res.json({ id: userId, role, token, name })
      } else next(new Error('Name or password is incorrect'))
    } else next(new Error('Name or password is incorrect'))
  }
}

export const handleLocalReg = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await localDataSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, surname, city, password, email, master } = validData
    const role = master ? 'master' : 'customer'
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const userToken = v4()

    const user = await User.create({
      salt,
      pass: bcPass,
      token: userToken,
      email,
      role,
    }).catch((err) => next(err))

    if (user && master) {
      const { id } = user
      const newMaster = await Master.create({ name, surname, city_id: city.id, user_id: id }).catch((err) => next(err))
      return newMaster && res.json({ token: userToken, role: 'master', id: newMaster.id, name })
    } else if (user && !master) {
      const { id } = user
      const newCustomer = await Customer.create({ name, surname, user_id: id }).catch((err) => next(err))
      return newCustomer && res.json({ token: userToken, role: 'customer', id: newCustomer.id, name })
    }
  }
}

export const stayAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers

  if (typeof token === 'string') {
    const user = await User.findOne({ where: { token } }).catch((err) => next(err))

    if (user && user.role === 'customer') {
      const customer = await Customer.findOne({ where: { user_id: user.id } }).catch((err) => next(err))
      return customer && res.json({ role: 'customer', id: customer.id, token, name: customer.fullName })
    } else if (user && user.role === 'master') {
      const master = await Master.findOne({ where: { user_id: user.id } }).catch((err) => next(err))
      return master && res.json({ role: 'master', id: master.id, token, name: master.fullName })
    } else return user && res.json({ token: user.token, id: 0, role: 'admin', name: 'admin' })
  } else return res.json(false)
}

export const handleGgLogin = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await googleTokenSchema.validate(req.body).catch((err) => next(err))

  if (validData) {
    const ticket = await client
      .verifyIdToken({
        idToken: validData.token,
        audience: google.client_id,
      })
      .catch((err) => next(err))
    if (ticket) {
      const payload = ticket.getPayload()
      const user = payload && (await User.findOne({ where: { email: payload.email } }))
      if (user) {
        const { id, token, role } = user
        const userByRole = await getUserByRole(role, token, id).catch((err) => next(err))
        res.json(userByRole)
      } else return next(new Error('User with this email not found. Try to login with password'))
    }
  }
}

export const handleGgReg = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await googleRegDataSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { isMaster, token, city } = validData
    const ticket = await client
      .verifyIdToken({
        idToken: token,
        audience: google.client_id,
      })
      .catch((err) => next(err))

    if (ticket) {
      const payload = ticket.getPayload()
      if (payload) {
        const { given_name, family_name, email } = payload
        const role = isMaster ? 'master' : 'customer'
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        let password = genPass.generate({ length: 8, numbers: true })
        const bcPass = await bcrypt.hash(password, salt)
        const userToken = v4()

        const newUser = await User.create({ email, role, salt, pass: bcPass, token: userToken }).catch((err) => {
          if (err.name === 'SequelizeUniqueConstraintError')
            next(new Error('User with this email already exist. Try to login with google'))
          next(err)
        })
        if (newUser && isMaster) {
          const { id } = newUser
          const newMaster = await Master.create({
            name: given_name,
            surname: family_name,
            city_id: city,
            user_id: id,
          }).catch((err) => next(err))
          return newMaster && res.json({ token: userToken, role: 'master', id: newMaster.id, given_name })
        }
        if (newUser && !isMaster) {
          const { id } = newUser
          const newCustomer = await Customer.create({
            name: given_name,
            surname: family_name,
            user_id: id,
          }).catch((err) => next(err))
          return newCustomer && res.json({ token: userToken, role: 'customer', id: newCustomer.id, given_name })
        }
      }
    }
  }
}

// export const signInFb = (req: Request, res: Response, next: NextFunction) => {
//   const {} = req.body
// }

// accessToken: "EAAHCd9dBIJ0BAH5wR85O4hOrk1q7EEj1J1it0G5qZAlgY8ds2EL7cNQysAE68V1Oi9DxMujD0ZA6BgtWlZAq4eVjI0EVVRSkh6Gh9Ow3WlXHQTtZAMbfZCXfDgLy6iMpSQJFcv14D0rCwdCYC4ghDXKenxCRpifNGLZC1lMC9ZCbDo4mGikeuP9A2GKeV8kslAHM01CCVimCKZCUWGilbhVZBJa4vdgCGDLgZD"
// data_access_expiration_time: 1625753915
// email: "baklykovadaria@gmail.com"
// expiresIn: 6085
// graphDomain: "facebook"
// id: "2905722249712527"
// name: "Daria Baklykova"
// picture: {data: {…}}
// signedRequest: "k-j0_7A7tXxMyHV9NIJjkmwtir0tpO4Q6keS18CPJQ8.eyJ1c2VyX2lkIjoiMjkwNTcyMjI0OTcxMjUyNyIsImNvZGUiOiJBUURiNnhIN1oyNVZkeG0wS2lxSGZTblZwWkRueF9WOF9VZkxwLWdOUWdhU0l6V2VGTlVSQTVXY2J1Rjl3R19GN3loOXFiS3UwUXlRczRpWlJ4OGhKMVloOGhMYkFPdmRoaTFWb19NUUdOdG1pYkZBSE1fR19wTkh1M0RiclZpQVhCSjZxUTlBTFNfSWVpQ1VIc2F1UWc0VFFTMng3dXpxTGxWWFdFOW1KTkdIU3VMMVkxUDlIeDBCNDgwNS0xSlY3OFFlbDVMMU1Sd0FfalQ4ZHJTb0RHU3ZRMUw5eFdabWo0Zks5X2FGUDFWbnpTOUtCOFd3R0NYWVR2bW9PYjlrRkxZbXA4Y0I4a2xIWnNWMUpsdUljMi1SNEJia0pYWjB3UmFCLXBJd1lXYUhnYl8xdHFuV1Y1Wk5IWDluT1k5XzhJSncwVDhwcTBWakZ3OGRtZ2MtZlBvcmdvOWRUblNlenhLLWhxSWUyaVVDUFEiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTYxNzk3NzkxNX0"
// userID: "2905722249712527"
