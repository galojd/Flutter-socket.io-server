const {io} = require('../index');//esta es una exportacion por nombre
const Cancion = require('../models/cancion');
const Canciones = require('../models/canciones');
const cantalo = new Canciones();

cantalo.addCancion(new Cancion('Luisa yo te amo'));
cantalo.addCancion(new Cancion('El quinto teletubi'));
cantalo.addCancion(new Cancion('Globos en el cielo'));
cantalo.addCancion(new Cancion('lobo hombre en paris'));

console.log(cantalo);

//mensaje de los sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('bandas-activas', cantalo.getCanciones());
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', {admin : payload});
    });

    client.on('vota-cancion', (payload) => {
        console.log(payload);
        cantalo.voteCancion(payload.id);//aqui mando el id para incrementar el 1 el voto
        io.emit('bandas-activas', cantalo.getCanciones());//con esto emito la respuesta a todos los clientes del servidor
    });

    client.on('agregar-cancion', (payload) => {
        
        /*const newcancion = new Cancion(payload.name)
        cantalo.addCancion(newcancion);*/
        cantalo.addnuecancion(payload.name);
        io.emit('bandas-activas', cantalo.getCanciones());
    });

    client.on('eliminar-cancion', (payload) => {
        cantalo.deleteCancion(payload.id);
        io.emit('bandas-activas', cantalo.getCanciones());
    });

    /*client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload);
        //io.emit('nuevo-mensaje', payload);//este codigo emite a todos los clientes
    })*/
  });