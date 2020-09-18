'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Hace falta el nombre del usuario']
    },
    //definir que otros datos agregar

}, {timestamps: true} );

UserSchema.index({name: 1});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserMode;
