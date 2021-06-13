const mongoose = require('mongoose')

const connStr = process.env.MONGODB_URI

console.log('connecting to', connStr)

mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log('error connecting to MongoDB: ', err.message);
    })

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String
})

/* contactSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
} */

contactSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)