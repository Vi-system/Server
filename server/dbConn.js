const mongoose = require("mongoose");

mongoose
    .connect(process.env.URLDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }).then((DB) => console.log("DB is connected")).catch((err) => console.log(err))