import { ObjectId } from "mongodb";

export class Pelicula {
    constructor(nombre, generos, anioEstreno) {
        this._id = new ObjectId(); 
        this.nombre = nombre;
        this.generos = generos;
        this.anioEstreno = anioEstreno;
    }
}
