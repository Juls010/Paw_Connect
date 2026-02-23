const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Debes ponerle un nombre al animal'],
        maxlength: [15, 'El nombre es demasiado largo (máximo 15)']
    },
    fechaNacimiento: { 
        type: Date, 
        required: [true, 'La fecha de nacimiento es obligatoria'] 
    },
    especie: {
        type: String,
        required: [true, 'La especie es obligatoria'],
        enum: {
        values: ['perro', 'gato', 'otro'], 
        message: '{VALUE} no es una especie válida (perro, gato u otro)' 
        }
    },
    peso: {
        type: Number,
        min: [0.1, 'El peso debe ser mayor a 0'], 
        required: [true, 'El peso es necesario para el registro']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Animal', animalSchema);