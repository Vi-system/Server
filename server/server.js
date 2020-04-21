require("./config/config");
require("./dbConn");
const
    express = require("express"),
    app = express(),
    path = require('path'),
    morgan = require("morgan"),
    bodyParser = require("body-parser");

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan("dev"));

//ROTES
app.use(require("./routes/index-router"));

//staticfiles
app.use(express.static(path.join(__dirname, './public')));

//app init
app.listen(process.env.PORT, () => {
    console.log("listen on port: ", process.env.PORT);
});