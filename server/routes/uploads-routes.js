const
    express = require('express'),
    { v4: uuid } = require('uuid'),
    file = require('express-fileupload'),
    app = express(),
    fs = require('fs'),
    User = require('../models/users'),
    Product = require('../models/products'),
    path = require('path');

app.use(file());

app.put('/upload/:type/:id', (req, res) => {
    let
        typeFile = req.params.type,
        idFile = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Select thi file to upload'
            }
        });
    }
    let file = req.files.file,
        validExtname = ['png', 'jpg', 'jpeg', 'gif'],
        validTypes = ['product', 'user'],
        [name, extname] = file.name.split('.');

    if (validExtname.indexOf(extname) < 0)
        return res.status(400).json({
            ok: false,
            err: {
                message: 'invalid file type',
                validFileType: validExtname.join(', ')
            }
        });

    if (validTypes.indexOf(typeFile) < 0)
        return res.status(400).json({
            ok: false,
            err: {
                message: 'invalid type'
            }
        });

    let filename = `${uuid()}-${idFile}.${extname}`;

    file.mv(`./uploads/${typeFile}/${filename}`, err => {
        if (err) return res.json({
            ok: false,
            err
        });

        typeFile === 'user' ?
            imgUser(idFile, res, filename, typeFile) :
            imgProduct(idFile, res, filename, typeFile);
    });
});

function imgProduct(idFile, res, filename, typeFile) {
    Product.findById(idFile, (err, result) => {
        if (err) {
            unlinkFile(filename, typeFile);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!result) {
            unlinkFile(filename, typeFile);
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'product not found'
                }
            });
        }

        unlinkFile(result.image, typeFile);

        result.image = filename;

        result.save((err, result) => {
            res.json({
                ok: true,
                message: 'Upload successfully',
                image: filename,
                result
            });
        });
    });
}

function imgUser(idFile, res, filename, typeFile) {
    User.findById(idFile, (err, result) => {
        if (err) {
            unlinkFile(filename, typeFile);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!result) {
            unlinkFile(filename, typeFile);
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'user not found'
                }
            });
        }

        unlinkFile(result.image, typeFile);

        result.image = filename;

        result.save((err, result) => {
            res.json({
                ok: true,
                message: 'Upload successfully',
                image: filename,
                result
            });
        });
    });
}

function unlinkFile(img, type) {

    let pathUrl = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if (fs.existsSync(pathUrl))
        fs.unlinkSync(pathUrl);
}

module.exports = app;