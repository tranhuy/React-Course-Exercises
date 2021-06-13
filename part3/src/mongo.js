const mongoose = require('mongoose')

const password = process.argv[2]
const connStr = `mongodb+srv://htran:${password}@devtraining.qwu0x.mongodb.net/db_Phonebook?retryWrites=true&w=majority`

mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const Contact = mongoose.model('Contact', contactSchema)

switch (process.argv.length) {
    case 3:
        console.log('Phonebook:')
        Contact.find({}).then(result => {
            if (result.length > 0) {
                result.forEach(contact => {
                    const { name, phone } = contact
                    console.log(`${name} ${phone}`)
                })
            } else {
                console.log('empty');
            }
        })    
        break;
    case 5:
        let newContactName = process.argv[3]
        let newContactPhone = process.argv[4]

        const contact = new Contact({
            name: newContactName,
            phone: newContactPhone
        })

        contact.save().then(result => {
            console.log(`Added ${newContactName} number ${newContactPhone} to the phonebook`)
            mongoose.connection.close()
        })
        break;
}