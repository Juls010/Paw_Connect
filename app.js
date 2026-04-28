const express = require('express');
const app = express();
const cors = require('cors');
const Animal = require('./models/Animal');
const User = require('./models/User');
const Adoption = require('./models/Adoption');

const { generateTokens, verifyRefreshToken } = require('./utils/jwt');
const { authenticate, hasRole } = require('./middleware/auth');

app.use(express.json());
app.use(cors());
app.get('/test', (req, res) => {
    res.send("El servidor está vivo");
});

app.post('/api/register', async (req, res) => {
    try {
        const exists = await User.findOne({ username: req.body.username });
        if (exists) return res.status(400).send({ message: 'El usuario ya existe' });
        
        const resultado = await User.create(req.body);
        res.status(201).send({ username: resultado.username, roles: resultado.roles });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Credenciales incorrectas' });
        }
        res.json(generateTokens(user)); 
    } catch (err) {
        res.status(500).send("Error en el login");
    }
});

app.post('/api/refresh', async (req, res) => {
    const { refresh } = req.body;
    if (!refresh) return res.status(400).json({ message: 'Refresh token requerido' });

    try {
        const payload = verifyRefreshToken(refresh);
        const user = await User.findById(payload.sub);
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
        res.json(generateTokens(user));
    } catch (err) {
        res.status(401).json({ detail: 'Token inválido o expirado' });
    }
});

app.get('/animales', async (req, res) => {
    res.send(await Animal.find());
});

app.get('/animales/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).send("Animal no encontrado.");
        res.json(animal);
    } catch (err) { res.status(500).send("Error de ID."); }
});

app.post('/animales', authenticate, hasRole('admin'), async (req, res) => {
    try {
        res.status(201).send(await Animal.create(req.body));
    } catch (err) { res.status(400).send(err.message); }
});

app.delete('/animales/:id', authenticate, hasRole('admin'), async (req, res) => {
    if (!await Animal.findByIdAndDelete(req.params.id)) return res.sendStatus(404);
    res.sendStatus(204);
});

app.get('/adopciones', authenticate, async (req, res) => {
    res.send(await Adoption.find().populate('animalId userId'));
});

app.post('/adopciones', authenticate, async (req, res) => {
    try {
        const nuevaAdopcion = await Adoption.create(req.body);
        await Animal.findByIdAndUpdate(req.body.animalId, { disponible: false });
        res.status(201).send(nuevaAdopcion);
    } catch (err) { res.status(400).send(err.message); }
});

app.delete('/adopciones/:id', authenticate, hasRole('admin'), async (req, res) => {
    try {
        const adopcion = await Adoption.findById(req.params.id);
        if (!adopcion) return res.sendStatus(404);
        await Animal.findByIdAndUpdate(adopcion.animalId, { disponible: true });
        await Adoption.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) { res.status(500).send(err.message); }
});

app.get('/usuarios', authenticate, hasRole('admin'), async (req, res) => {
    res.send(await User.find());
});

app.use(express.static('public'));
module.exports = app;