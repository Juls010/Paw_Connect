const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'], 
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'] 
    },
    puntosFidelidad: {
        type: Number,
        max: [1000, 'El máximo de puntos permitidos es 1000'], 
        default: 0 
    },
    esSocio: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);