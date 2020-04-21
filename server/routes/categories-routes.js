const express = require('express');
const
    app = express(),
    { validToken, validRole } = require('../middlewares/auth'),
    {
        getCategories,
        getCategorie,
        postCategorie,
        putCategorie,
        deleteCategorie
    } = require('./routes.controller/categorie-router-controller');


app
    .get('/categorie', validToken, getCategories)
    .get('/categorie/:id', validToken, getCategorie)
    .post('/categorie', validToken, postCategorie)
    .put('/categorie/:id', validToken, putCategorie)
    .delete('/categorie/:id', [validToken, validRole], deleteCategorie);

module.exports = app;