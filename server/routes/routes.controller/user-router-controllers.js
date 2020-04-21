const controllerRoutes = {};
const User = require("../../models/users");
const _ = require("underscore");

controllerRoutes.userGet = (req, res) => {
    let from = Number(req.query.from || 0);
    let limit = Number(req.query.limit || 5);
    User.find({ status: true }, "name email role status")
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            User.countDocuments({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    count,
                    users,
                });
            });
        });
};
controllerRoutes.userPost = async(req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
    });
    user.password = await user.encrypt(user.password);
    user.save((err, a) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.status(200).json({
            ok: true,
            a: user,
        });
        res.end();
    });
};
controllerRoutes.userPut = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["name", "email", "img", "status", "role"]);

    User.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                user: userDB,
            });
        }
    );
};
controllerRoutes.userDelete = (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(
        id, { status: false }, { new: true },
        (err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                user: userDB,
            });
        }
    );

    /* User.findByIdAndRemove(id, (err, user) => {
                                                          if (err) {
                                                              return res.status(400).json({
                                                                  ok: false,
                                                                  err
                                                              });
                                                          }
                                                          if (!user) {
                                                              return res.status(404).json({
                                                                  ok: false,
                                                                  err: "User not found"
                                                              });
                                                          }
                                                          res.json({
                                                              ok: true,
                                                              user
                                                          });
                                                      }); */
};

module.exports = controllerRoutes;