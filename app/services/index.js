'use strict';

const express = require('express');
const morgan = require('morgan');
const apiRouter = express.Router();
const userRouter = require('./user');

// montar rutas para cada servicio (a medida que los vaya creando agregarlos aca)
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
