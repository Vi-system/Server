const
    express = require('express'),
    { validToken } = require('../middlewares/auth'),
    app = express(),
    {
        getProducts,
        getProduct,
        postProduct,
        putProduct,
        deleteProduct,
        inStockProduct,
        searchProduct
    } = require('./routes.controller/products-router-controller');

app
    .get('/product/search/:search', validToken, searchProduct)
    .get('/product', validToken, getProducts)
    .get('/product/:id', validToken, getProduct)
    .post('/product', validToken, postProduct)
    .put('/product/:id', validToken, putProduct)
    .delete('/product/:id', validToken, deleteProduct)
    .put('/product/in-stock/:id', validToken, inStockProduct);

module.exports = app;