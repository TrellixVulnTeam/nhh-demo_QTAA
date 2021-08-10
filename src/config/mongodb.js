const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log('db success')
    }catch(error){
        console.log(error,'ket noi db that bai')
    }
}

module.exports = { connect }