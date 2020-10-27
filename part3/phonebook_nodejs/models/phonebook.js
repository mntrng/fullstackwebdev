const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3 },
  phone: {
    type: String,
    require: true,
    minlength: 8 }
})
phonebookSchema.plugin(mongooseUniqueValidator)

// Format the objects returned by Mongoose - IMPORTANT
phonebookSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Phone', phonebookSchema)