const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Socket = require('../models/socket');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //HTTP SERVER
        this.server = http.createServer(this.app);
        //CONFIGURACIONES DE SOCKETS

        this.io = socketio(this.server, { /*CONFIGURACIONES */ })

    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());
    }


    configSocket() {
        const socket = new Socket(this.io);
        socket.socketEvents();
    }

    execute() {
        //Incializar middleware
        this.middlewares();
        //Inicializar Server
        this.configSocket();
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en puerto :${this.port}`);
        });
    }


}
module.exports = Server;