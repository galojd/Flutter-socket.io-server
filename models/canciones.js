const Cancion = require("./cancion");


class Canciones{
    constructor(){
        this.Canciones = [];
    }

    addCancion(Cancion = new Cancion()){//este es la forma de agregar mandando una instancia
        this.Canciones.push(Cancion);
    }

    addnuecancion(name){//aqui agrego el dato solo mandando el nombre
        const cancion = new Cancion(name);
        this.Canciones.push(cancion);

    }

    getCanciones(){
        return this.Canciones;
    }

    deleteCancion(id = ''){
        this.Canciones = this.Canciones.filter(
            Cancion => Cancion.id !== id
        );
        return this.Canciones;
    }

    voteCancion(id = ''){
        this.Canciones = this.Canciones.map(Cancion =>{
            if(Cancion.id === id){
                Cancion.votes++;
                return Cancion;
            }else{
                return Cancion;
            }
        });
    }
}

module.exports = Canciones;