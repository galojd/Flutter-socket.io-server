const { v4: uuidv4 } = require('uuid');

class Cancion{
    constructor(name = 'no-name'){

        this.id = uuidv4();
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Cancion;