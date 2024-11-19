import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Pelicula } from "./pelicula.js"; 

const peliculaCollection = client.db('cine').collection('peliculas');

async function handleInsertPeliculaRequest(req, res) {
    let data = req.body;

    
    let pelicula = new Pelicula(data.nombre, data.generos, data.anioEstreno); 

    try {
        let result = await peliculaCollection.insertOne(pelicula);
        if (result.insertedCount === 0) {
            return res.status(400).send('Error al guardar registro');
        }
        return res.status(201).send(result);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e });
    }
}

async function handleGetPeliculasRequest(req, res) {
    try {
        let data = await peliculaCollection.find({}).toArray();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}

async function handleGetPeliculaRequest(req, res) {
    let id = req.params.id;

    try {
        let oid = ObjectId.createFromHexString(id);
        let data = await peliculaCollection.findOne({ _id: oid });
        
        if (!data) {
            return res.status(404).send('Pelicula no encontrada');
        }

        return res.status(200).send(data);
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleUpdatePeliculaRequest(req, res) { 
    let id = req.params.id;
    let pelicula = req.body;

    try {
        let oid = ObjectId.createFromHexString(id);
        let query = { $set: pelicula }; 

        let result = await peliculaCollection.updateOne({ _id: oid }, query);
        if (result.modifiedCount === 0) {
            return res.status(400).send('No se encontró película para actualizar');
        }

        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleDeletePeliculaRequest(req, res) {
    let id = req.params.id;

    try {
        let oid = ObjectId.createFromHexString(id);
        let result = await peliculaCollection.deleteOne({ _id: oid });
        if (result.deletedCount === 0) {
            return res.status(404).send('Pelicula no encontrada');
        }

        return res.status(200).send(result);
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleSearchPelicularequest(req, res) {
    let query = req.body;

    try {
        let data = await peliculaCollection.find(query).toArray();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).send({ error: e });
    }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaRequest,
    handleUpdatePeliculaRequest,
    handleDeletePeliculaRequest,
    handleSearchPelicularequest
};
