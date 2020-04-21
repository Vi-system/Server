const
    express = require('express'),
    path = require('path'),
    { validTokenImg } = require('../middlewares/auth'),
    fs = require('fs'),
    app = express();

app.get('/image/:type/:img', validTokenImg, (req, res) => {
    let type = req.params.type,
        img = req.params.img,
        no_img_path = path.resolve(__dirname, '../assets/images/no-image.jpg'),
        pathUrl = path.resolve(__dirname, `../../uploads/${type}/${img}`),
        pathFile = fs.existsSync(pathUrl) ? pathUrl : no_img_path;

    res.sendFile(pathFile);
});

module.exports = app;