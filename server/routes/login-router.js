const
    express = require("express"),
    bcryptjs = require("bcryptjs"),
    jwt = require("jsonwebtoken"),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.CLIENT_ID),
    User = require("../models/users"),
    app = express();

app.post("/login", (req, res) => {
    let body = req.body;
    let user = User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User or password invalid",
                },
            });
        } else if (!body.password) {
            return res.status(400).json({
                ok: false,
                error: "password required",
            });
        } else if (!bcryptjs.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User or password invalid",
                },
            });
        }
        const token = jwt.sign({
                user,
            },
            process.env.TOKEN_SKEY, { expiresIn: process.env.TOKEN_TIME }
        );
        res.json({
            ok: true,
            userdb: user,
            token,
        });
    });
});

//cofig of google

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        image: payload.picture,
        google: true
    };
}


app.post('/google', async(req, res) => {
    let token = req.body.idToken;

    let googleUser = await verify(token)
        .catch(err => {
            res.status(403).json({
                ok: false,
                err
            });
        });

    User.findOne({ email: googleUser.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (user) {
            if (user.google === 'false') {
                return res.status(400).json({
                    ok: false,
                    err,
                    message: 'Use a normal Signin'
                });
            } else {
                const token =
                    jwt.sign({
                            user,
                        },
                        process.env.TOKEN_SKEY, { expiresIn: process.env.TOKEN_TIME }
                    );
                return res.json({
                    ok: true,
                    user,
                    token
                });
            }
        } else {
            //si no existe
            let newUser = new User();

            newUser.name = googleUser.name;
            newUser.email = googleUser.email;
            newUser.image = googleUser.image;
            newUser.google = googleUser.google;
            newUser.password = ':)';

            newUser.save((err, user) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                const token =
                    jwt.sign({
                            user,
                        },
                        process.env.TOKEN_SKEY, { expiresIn: process.env.TOKEN_TIME }
                    );
                return res.json({
                    ok: true,
                    user,
                    token
                });
            });
        }
    });
    /*  res.json({
         googleUser
     }); */
});

module.exports = app;