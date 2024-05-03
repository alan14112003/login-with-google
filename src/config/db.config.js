const { default: mongoose } = require('mongoose')

const dbConfig = {
  async MongoDB() {
    try {
      const connect = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`connected ${connect.connection.host}`)
    } catch (e) {
      console.error(`Error: ${e}`)
      process.exit()
    }
  },
}

export default dbConfig
