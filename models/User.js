const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'El nombre de usuario es obligatorio'], 
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'] 
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6 
    },
    roles: { 
        type: [String], 
        default: ['user'] 
    },
    puntosFidelidad: { type: Number, max: 1000, default: 0 },
    esSocio: { type: Boolean, default: false }
}, { timestamps: true }); 


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password); 
};

module.exports = mongoose.model('User', userSchema);