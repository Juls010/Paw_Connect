const { connectDB } = require('./db');
const app = require('./app');

connectDB();

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

