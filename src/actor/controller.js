import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Actor } from "./actor.js"; 

const actorCollection = client.db('cine').collection('actores');
const peliculaCollection = client.db('cine').collection('peliculas');

async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = new Actor();

    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;
    
    
    try {
        actor.idPelicula = new Actor(data.nombre, data.edad, data.estaRetirado, data.premios);  
    } catch (e) {
        return res.status(400).send('ID de película mal formado');
    }

    try {
        let pelicula = await peliculaCollection.findOne({ _id: actor.idPelicula });
        if (!pelicula) {
            return res.status(404).send('Película no encontrada');
        }

        await actorCollection.insertOne(actor)
            .then((result) => {
                return res.status(201).send(result);
            })
            .catch((e) => {
                return res.status(500).send({ error: e });
            });
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}

async function handleGetActoresRequest(req, res) {
    try {
        let actores = await actorCollection.find({}).toArray();
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}

async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;

    try {
        let oid = new ObjectId(id);
        let actor = await actorCollection.findOne({ _id: oid });

        if (!actor) {
            return res.status(404).send('Actor no encontrado');
        }
        return res.status(200).send(actor);
    } catch (e) {
        return res.status(400).send('ID mal formado');
    }
}

async function handleGetActoresByPeliculaRequest(req, res) {
    let nombrePelicula = req.params.pelicula;

    try {
        let pelicula = await peliculaCollection.findOne({ nombre: nombrePelicula });
        if (!pelicula) {
            return res.status(404).send('Película no encontrada');
        }

        let actores = await actorCollection.find({ idPelicula: pelicula._id }).toArray();
        return res.status(200).send(actores);
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest
};

