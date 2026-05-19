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

## Despliegue y CI/CD (GitHub Actions + Render)

Se ha implementado un pipeline completo de Integración y Despliegue Continuo (CI/CD) cumpliendo con los requisitos de la actividad:

1. **GitHub Actions**: Se ha creado el flujo `.github/workflows/deploy.yml` que se ejecuta en cada push a la rama `main`. Este flujo levanta un contenedor de MongoDB local, instala dependencias y ejecuta la suite de pruebas.
2. **Cobertura de Pruebas (Paso extra)**: En lugar de ejecutar simplemente los tests, el pipeline calcula la cobertura de código usando `nyc` mediante el comando `npm run test:coverage`.
3. **Despliegue automático (Deploy Hook)**: Si todos los tests pasan correctamente, el workflow de GitHub hace una petición mediante `curl` al Webhook secreto de Render para disparar el despliegue automático en el servidor de producción.
4. **Ruta de Comprobación de Salud**: Se ha creado la ruta `/health`, que verifica si la API está viva y realiza una consulta (`Animal.findOne()`) a MongoDB Atlas para comprobar la conexión. Devuelve estado `200 OK` si es exitosa o `503 Service Unavailable` en caso contrario.
5. **Logs de Servidor**: Se ha integrado el middleware `morgan` en `app.js` para registrar todas las peticiones HTTP que recibe el servidor, utilizando diferentes niveles de detalle según el entorno.

### Evidencias de Despliegue

**Comprobación de Salud (/health) funcionando en producción:**  
![Captura del estado Health en Render](https://res.cloudinary.com/dc4u0bzgh/image/upload/v1779181556/b3f5b220-e28f-4303-87e6-415fbd798e78.png)

**Registro de Peticiones HTTP (Logs de Morgan en Render):**  
![Captura de los logs de Morgan en Render](https://res.cloudinary.com/dc4u0bzgh/image/upload/v1779181606/a6c74436-b892-4114-b22b-c5ec7b2e430b.png)

---
Proyecto de Integración de Bases de Datos MongoDB

Julia N.G 💕