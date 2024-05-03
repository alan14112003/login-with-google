import UserController from '@/controllers/user.controller'
import express from 'express'

const UserRouter = express.Router()

UserRouter.post('/login', UserController.login)
UserRouter.post('/login-google', UserController.loginWithGoogle)

export default UserRouter
