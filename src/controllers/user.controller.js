import googleOauth2Config from '@/config/googleOauth2.config'
import jwtConfig from '@/config/jwt.config'
import User from '@/models/User'

const getUserResult = (user) => ({
  name: user.name,
  email: user.email,
  role: user.role,
})

const UserController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        email: email,
        password: password,
      })

      const userResult = getUserResult(user)

      const accessToken = jwtConfig.createToken({ id: user._id })

      if (user) {
        return res.json({
          user: userResult,
          token: accessToken,
        })
      }

      return res.status(401).json({
        message: 'sai tài khoản hoặc mật khẩu',
      })
    } catch (error) {
      next(error)
    }
  },

  // tạo method login with google
  loginWithGoogle: async (req, res, next) => {
    try {
      const { token } = req.body
      const payload = await googleOauth2Config.verify(token)

      let auth = await User.findOne({
        email: payload.email,
      })

      if (!auth) {
        auth = await User.create({
          email: payload.email,
          name: `${payload.family_name} ${payload.given_name}`,
          password: '123',
          role: 1,
        })
      }

      const userResult = getUserResult(auth)
      const accessToken = jwtConfig.createToken({ id: auth._id })

      return res.json({
        user: userResult,
        token: accessToken,
      })
    } catch (error) {
      next(error)
    }
  },
}

export default UserController
