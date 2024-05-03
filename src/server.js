import express from 'express'
import Router from './routes/index.route'
import { configDotenv } from 'dotenv'
import dbConfig from './config/db.config'
import cors from 'cors'

configDotenv()

const app = express()
const PORT = process.env.PORT ?? 3000

// kết nối mongodb
dbConfig.MongoDB()

// mở chặn cors(có thể chấp nhận tên miền tùy chỉnh, mà mình làm như này cho nhanh)
app.use(cors('*'))
// chấp nhận json trong post method
app.use(express.json())

// kết nối đến các tuyến đường
app.use(Router)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json(err)
})

app.listen(PORT, () => {
  console.log('app listen in port ', PORT)
})
