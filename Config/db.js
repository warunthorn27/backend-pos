const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://SA:$ystem64@poscooperativeeducation.jwqfqk0.mongodb.net/?retryWrites=true&w=majority&appName=poscooperativeeducation')
        console.log('Connect DB')
    } catch (error) {
        
    }
}

module.exports = connectDB