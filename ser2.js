const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//const apiRouter = require('./app/services');
const fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let {PythonShell} = require('python-shell');
let options = {
    mode : 'text', //podria ser json
    pythonPath: '/usr/bin/python2.7',
    pythonOptions: ['-u'],
    args: []
};
let sckt;

app.use(express.static(__dirname + '/public')); //html por defecto, estatico, sin template engines
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res
        .status(200)
        .sendFile(__dirname + '/public/ind2.html');
});

app.get('/ventanaIO', function (req, res) {
    res
        .status(200)
        .sendFile(__dirname + '/public/ind3.html');
});

app.post('/', function (req, res) { /* VER ESTO, ¿REPUESTA A POST DEL USUARIO? */
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("mando la respuesta");
});

app.post('/procesar', function (req, res) { //queda pending despues de ejecutar en chrome

    let codigoLimpio = req.body.codigo; //toString??
    let mensaje;

    fs.writeFile(__dirname + '/public/emptyscript.py', codigoLimpio, function (err) {
        if (err) throw err;
    });

    const pyshell = new PythonShell(__dirname + '/public/emptyscript.py', options);

    pyshell.on('message', function (message) {
        console.log(message);
        mensaje = message;
        io.emit('chat message', message);

        sckt.on('valorIO', (valorIngresado) =>{
            pyshell.send(valorIngresado); /** envio al script de python (lo toma como entrada estandar) el valor
             ingresado por el usuario en la ventana de IO**/
        });
    });

    pyshell.on('error', function (err) {
        console.log(' error: ', err);
        io.emit('chat message', err.toString());
    });

  /**  pyshell.on('close', function (err) {
        console.log("Entro a close");
       }); **/

  /**  pyshell.end(function (err) {
        //acomodar este end para que sea llamado de forma asincrónica, depués de haber enviado los posibles datos
        // del usuario (se llega aca antes de leer el input, debo capturarlo).
        // Ver si sirve libreria async
        if (err) throw  err;

        console.log("pyshell hace end");

    }); **/
    res.status(204).send();
});

io.on('connection', (socket) => {
    sckt = socket;
    socket.on('chat message', (msg) => {
       // console.log('message: ' + msg);
        io.emit('chat message', msg);
        /*envio msj a todos los clientes (emito evento a todos los sockets
          conectados) */
    });
});

http.listen(3000, function () {
    console.log('Escuchando en el puerto 3000');
});


// Implementar manejo de errores
/**
function recortarError(error){
    error = error.toString();
    //let newError = error.split('(')[0]; //no encuentra y devuelve, MEJORAR ESTO

   // let strSub = error.slice(0, error.indexOf('PythonShell.'));
   // let regex = new RegExp('\\b' + 'PythonShell.parseError' + '\\b');
   // let indice = error.search(regex);

    return error;
}; **/