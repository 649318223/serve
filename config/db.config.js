const mongoose = require('mongoose')

const username = 'root'
const password = 'mz123123.'
const hostUrl = '47.108.51.28:1819'
// const hostUrl = '127.0.0.1:27017'
const database = 'company-system'
mongoose.connect(`mongodb://${username}:${password}@${hostUrl}/${database}?authSource=admin`)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('error', err => {
  console.error('Failed to connect to MongoDB:', err)
})
