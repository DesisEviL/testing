const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MongoDB_URI


mongoose.connect(url).then( result => {
    console.log('Connected to MongoDB');    
}).catch(error => [
    console.log('Error connecting to MongoDB:', error.message)
])

const personSchema = new mongoose.Schema({
    Name : String,
    Number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)