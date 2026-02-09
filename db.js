const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/paw_connect')
    .then(() => console.log('Conectado a MongoDB con éxito')) 
    .catch(err => console.error('Error conectando a MongoDB:', err)); 
}

module.exports = { connectDB }; 