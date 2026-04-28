const mongoose = require('mongoose');

async function connectDB() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/paw_connect';
    
    await mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB con éxito')) 
    .catch(err => console.error('Error conectando a MongoDB:', err)); 
}

module.exports = { connectDB }; 