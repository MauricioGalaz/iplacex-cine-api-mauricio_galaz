import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js'; 
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js'; // Importar las rutas de actores

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Ruta de bienvenida
app.all('/', (req, res) => { 
    return res.status(200).send('Bienvenido al cine Iplacex');
});

// Rutas para películas
app.use('/api', peliculaRoutes);

// Rutas para actores
app.use('/api', actorRoutes); // Usar las rutas de actores

async function startServer() {
    try {
        await client.connect(); // Conectar a MongoDB
        console.log('Conectado al clúster');
        
        // Iniciar el servidor en el puerto especificado
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Ha ocurrido un error al conectar al clúster de Atlas:', error.message);
        process.exit(1); // Detener el proceso si no se puede conectar
    }
}

startServer();
