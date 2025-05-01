const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1);   
}

const password = process.argv[2]

const url = `mongodb+srv://aem3asp:${password}@cluster0.dh928lk.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    Name: String,
    Number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person ({
//     Name: 'Mr.7',
//     Number: '4755432148'
// })

// person.save().then(result => {
//     console.log('person saved!')
    
//     console.log(result);
    
// })

Person.find({Name: 'Mr.7'}).then(result => {
    result.forEach(person => {
        console.log(person.Name, person.Number)
    })
    mongoose.connection.close()
        
    })
    
    