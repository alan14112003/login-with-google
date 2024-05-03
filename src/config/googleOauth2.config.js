import { configDotenv } from 'dotenv'
const { OAuth2Client } = require('google-auth-library')

configDotenv()

const audience = process.env.CLIENT_IDS?.split(',') ?? ''

const googleOauth2Config = {
  /**
   * hàm verify chịu trách nhiệm giải mã của token do google trả về để phân tích ra được email của user
   * và các thông tin public khác
   */
  verify: async (token) => {
    // tạo một oauth2 client của google
    const oauth2Client = new OAuth2Client()

    // tiến hành giải mã của token do google trả về
    const loginTicket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: audience,
    })

    return loginTicket.getPayload()
  },
}

export default googleOauth2Config
