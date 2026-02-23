const request = require("supertest");
const { expect } = require("chai");
const mongoose = require("mongoose");
const app = require("../app"); 
const Animal = require("../models/Animal");
const User = require("../models/User");

describe("PawConnect API - Pruebas de Integración", () => {
    
    before(async () => {
        await mongoose.connect("mongodb://localhost:27017/pawconnect_test");
    });

    beforeEach(async () => {
        await Animal.deleteMany({});
        await User.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.close();
    });

    // Animales

    it("1. [POST] Crear animal con fecha de nacimiento (Positivo)", async () => {
        const res = await request(app).post("/animales").send({
            nombre: "Rex", 
            especie: "perro", 
            fechaNacimiento: "2024-01-01",
            peso: 15 
        });
        expect(res.status).to.equal(201);
        expect(res.body.nombre).to.equal("Rex");
    });

    it("2. [POST] ERROR: Crear animal sin fecha de nacimiento (Negativo)", async () => {
        const res = await request(app).post("/animales").send({
            nombre: "SinFecha",
            especie: "gato"
        });
        expect(res.status).to.equal(400);
    });

    it("3. [GET] ERROR: Obtener animal con ID inválido (Negativo)", async () => {
        const res = await request(app).get("/animales/123-id-falso");
        expect(res.status).to.equal(500); 
    });

    it("4. [GET] Obtener todos los animales (Positivo)", async () => {
        const res = await request(app).get("/animales");
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    // Usuarios

    it("5. [POST] Crear un usuario correctamente (Positivo)", async () => {
        const res = await request(app).post("/usuarios").send({
            username: "Juan"
        });
        expect(res.status).to.equal(201);
    });

    it("6. [PUT] ERROR: Actualizar usuario con datos inválidos (Negativo)", async () => {
        const user = await User.create({ username: "Pepe" });
        const res = await request(app).put(`/usuarios/${user._id}`).send({
            puntosFidelidad: 99999 
        });
        expect(res.status).to.equal(400);
    });

    it("7. [DELETE] Borrar un usuario existente (Positivo)", async () => {
        const user = await User.create({ username: "BorrarMe" });
        const res = await request(app).delete(`/usuarios/${user._id}`);
        expect(res.status).to.equal(204);
    });

    it("8. [GET] ERROR: Usuario que no existe (Negativo)", async () => {
        const res = await request(app).get("/usuarios/65d123456789012345678901");
        expect(res.status).to.equal(404);
    });

    // Adopciones  

    it("9. [GET] Listar adopciones con populate (Positivo)", async () => {
        const res = await request(app).get("/adopciones");
        expect(res.status).to.equal(200);
    });

    it("10. [POST] Registrar una adopción (Positivo)", async () => {
        const animal = await Animal.create({ 
            nombre: "Luna", 
            especie: "gato", 
            fechaNacimiento: "2023-10-10",
            peso: 5 
        });
        const user = await User.create({ username: "Adora" });
        const res = await request(app).post("/adopciones").send({
            animalId: animal._id,
            userId: user._id
        });
        expect(res.status).to.equal(201);
    });
});