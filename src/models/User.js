const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  email: String,
  role: Number,
  password: String,
})
const User = model('User', userSchema)

export default User
