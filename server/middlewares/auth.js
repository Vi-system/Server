const jwt = require("jsonwebtoken");

const validToken = (req, res, next) => {
    let token = req.get("auth");

    jwt.verify(token, process.env.TOKEN_SKEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
            });
        }

        req.user = decode.user;
        next();
    });
};

const validRole = (req, res, next) => {
    let token = req.get("auth");

    jwt.verify(token, process.env.TOKEN_SKEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
            });
        }

        if (decode.user.role != "ADMIN_ROLE") {
            return res.status(401).json({
                ok: false,
                err: "Not ADMIN ROLE user",
            });
        }
        next();
    });
};


const validTokenImg = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, process.env.TOKEN_SKEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
            });
        }

        req.user = decode.user;
        next();
    });
};

module.exports = {
    validToken,
    validRole,
    validTokenImg,
};