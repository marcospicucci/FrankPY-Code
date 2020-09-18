'use strict';

const express = require('express');
const router = express.Router();
const create = require('./handlers/create');
const update = require('./handlers/update');
const destroy = require('./handlers/destroy');
const list = require('./handlers/list');

// analizar esto
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
router.get('/', list);

module.exports = router;