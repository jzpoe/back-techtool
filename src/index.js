
const express = require('express');
require('dotenv').config(); // Cargar variables de entorno
const connectDB = require('./mongoose/mongoose'); // Importar la conexión
const router = require('./routes/routes-sesion'); // Rutas
var cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port= process.env.PORT


app.use('/api', router);



connectDB().then(() => {
    app.use('/api', router);

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });
});






