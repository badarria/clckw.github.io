import React from 'react'
import { Redirect } from 'react-router-dom'
import { Admin } from '../containers'

export const AdminPage = ({ isAuth }) => (isAuth ? <Admin /> : <Redirect to='/' />)
