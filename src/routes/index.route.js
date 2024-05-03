import express from 'express'
import UserRouter from './user.route'

const Router = express.Router()

Router.use('/users', UserRouter)

export default Router
