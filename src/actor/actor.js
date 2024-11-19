import { ObjectId } from "mongodb";

export class Actor {
    constructor(nombre, edad, estaRetirado, premios, idPelicula) {
        this._id = new ObjectId();
        this.nombre = nombre;
        this.edad = edad;
        this.estaRetirado = estaRetirado;
        this.premios = premios;  
        this.idPelicula = idPelicula;  
    }
}

