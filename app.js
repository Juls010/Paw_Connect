const express = require('express');
const app = express();
const Animal = require('./models/Animal');
const User = require('./models/User');
const Adoption = require('./models/Adoption');

app.use(express.json());
app.use(express.static('public'));

// ANIMALES 
app.get('/animales/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) return res.status(404).send("Animal no encontrado.");
        res.json(animal);
    } catch (err) { res.status(500).send("Error de ID."); }
});

app.get('/animales', async (req, res) => {
    res.send(await Animal.find());
});

app.post('/animales', async (req, res) => {
    try {
        res.status(201).send(await Animal.create(req.body));
    } catch (err) { res.status(400).send(err.message); }
});

app.put('/animales/:id', async (req, res) => {
    try {
        const resultado = await Animal.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        if (!resultado) return res.sendStatus(404);
        res.send(resultado);
    } catch (err) { res.status(400).send(err.message); }
});

app.delete('/animales/:id', async (req, res) => {
    if (!await Animal.findByIdAndDelete(req.params.id)) return res.sendStatus(404);
    res.sendStatus(204);
});

// USUARIOS 
app.get('/usuarios/:id', async (req, res) => {
    try {
        const resultado = await User.findById(req.params.id);
        if (!resultado) return res.status(404).send("Usuario no encontrado.");
        res.json(resultado);
    } catch (err) { res.status(500).send("Error de ID."); }
});

app.get('/usuarios', async (req, res) => {
    res.send(await User.find());
});

app.post('/usuarios', async (req, res) => {
    try {
        res.status(201).send(await User.create(req.body));
    } catch (err) { res.status(400).send(err.message); }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const resultado = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        if (!resultado) return res.sendStatus(404);
        res.send(resultado);
    } catch (err) { res.status(400).send(err.message); }
});

app.delete('/usuarios/:id', async (req, res) => {
    if (!await User.findByIdAndDelete(req.params.id)) return res.sendStatus(404);
    res.sendStatus(204);
});

// ADOPCIONES 
app.get('/adopciones/:id', async (req, res) => {
    try {
        const resultado = await Adoption.findById(req.params.id).populate('animalId userId');
        if (!resultado) return res.status(404).send("Adopción no encontrada.");
        res.json(resultado);
    } catch (err) { res.status(500).send("Error de ID."); }
});

app.get('/adopciones', async (req, res) => {
    res.send(await Adoption.find().populate('animalId userId'));
});

app.post('/adopciones', async (req, res) => {
    try {
        const nuevaAdopcion = await Adoption.create(req.body);
        await Animal.findByIdAndUpdate(req.body.animalId, { disponible: false });
        res.status(201).send(nuevaAdopcion);
    } catch (err) { res.status(400).send(err.message); }
});

app.delete('/adopciones/:id', async (req, res) => {
    try {
        const adopcion = await Adoption.findById(req.params.id);
        if (!adopcion) return res.sendStatus(404);
        await Animal.findByIdAndUpdate(adopcion.animalId, { disponible: true });
        await Adoption.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = app; 