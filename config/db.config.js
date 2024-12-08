const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/company-system')

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

mongoose.connection.on('error', err => {
  console.error('Failed to connect to MongoDB:', err)
})
