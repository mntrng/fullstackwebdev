const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const phonenumber = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.qkoo5.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Phone = mongoose.model('Phone', phonebookSchema)

const insert = new Phone({
  name: `${name}`,
  phone: `${phonenumber}`
})

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Phone.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name, person.phone)
      })
      // Close the connection AND exit the process with a successful code (0)
      mongoose.connection.close()
      process.exit(0)
    })
}

insert.save().then(() => {
  console.log(`Added ${phonenumber} for ${name}!`)
  mongoose.connection.close()
})