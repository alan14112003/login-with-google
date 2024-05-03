import jwt from 'jsonwebtoken'
const jwtConfig = {
  createToken(payload, exp = '1y') {
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: exp })
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY_JWT)
  },
}

export default jwtConfig
