// Importar mongoose
const mongooseDB = require('mongoose')

// Datos de URL para establecer conexion
const user = 'IPS2792'
const password = 'wYJAkD6i6e9xQqi'
const host ='kodemia-7ma-gen-llxsb.mongodb.net'
const dbName = 'kodemia'
const url = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`

//Definicion de esquema
const koderSchema = new mongooseDB.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
    },
    generation: {
        type: Number,
        required: true,
        min: 1
    },
    gender: {
        type: String,
        enum: ['m', 'f', 'n']
    }
})

mongooseDB.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connection successful')
    
    //Definicion de consulta promificada
    const KodersModel = mongooseDB.model('koders', koderSchema)
    KodersModel.find({generation: 7}).then(koders => {
        console.log('koders: ', koders)
    }).catch(error => {
       console.error('Error: ', error) 
    })
    
    //Nuevo documento
    let newKoder = new KodersModel({name: 'Carlos', generation: 7, gender: 'm'})
    newKoder.save().then(() => {
        console.log('new koder was created')
    }).catch(error => {
        console.error('Error: ', error)
    })

    newKoder = KodersModel.create({name: 'new koder by create method', generation: 7, gender: 'n'}).then(() => {
        console.log('new koder was created')
    }).catch(error => {
        console.error('Error: ', error)
    })


}).catch(error => {
    console.error('Error: ', error)
})