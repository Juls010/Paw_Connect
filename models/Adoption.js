const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    animalId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Animal', 
        required: [true, 'Es obligatorio indicar qué animal se adopta']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'Es obligatorio indicar el adoptante']
    },
    fecha: {
        type: Date,
        default: Date.now 
    },
    entregado: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Adoption', adoptionSchema);