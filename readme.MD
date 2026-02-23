![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Mocha](https://img.shields.io/badge/-Mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

# PawConnect API - Gestión de Adopciones

Proyecto desarrollado con **Node.js**, **Express** y **MongoDB (Mongoose)** para la gestión integral de una protectora de animales.

---

## Testing y Documentación
- **Pruebas de Integración:** Se han implementado **10 tests** automatizados utilizando **Mocha**, **Chai** y **Supertest**.
- **Casos Negativos:** Se incluyen **4 casos de prueba negativos** que fuerzan errores de validación en Mongoose (faltas de campos obligatorios como fecha o peso, y errores de formato).
- **Documentación OAS:** Especificación completa de la API siguiendo el estándar **OpenAPI 3.0** en el archivo `openapi.yaml`.

---

## Instrucciones de testing

Para verificar el correcto funcionamiento de la API y las validaciones de los modelos, ejecuta:

1. Descomprimir el archivo y abrir una terminal en la carpeta raíz.
2. Instalar dependencias de desarrollo: `npm install`
3. Ejecutar la suite de pruebas:
   ```bash
   npm test


## Documentación OpenAPI

El proyecto incluye el archivo openapi.yaml que describe la estructura de los modelos y las operaciones CRUD. Para una visualización interactiva:

1. Copia el contenido de `openapi.yaml`.
2. [Pégalo en el Swagger Editor](https://editor.swagger.io/).
3. Podrás observar la definición de la clase Animal en la sección Schemas.

![Documentación Swagger](https://res.cloudinary.com/dc4u0bzgh/image/upload/v1771838799/documentacion-api_jpnhah.png)

## Colección Postman
🔗 **[Ver colección en Postman](https://documenter.getpostman.com/view/48709273/2sBXcAHMzF)**

---
Proyecto de Integración de Bases de Datos MongoDB

Julia N.G 💕