const categorieRouterControllers = {},
    Categorie = require("../../models/categories");

categorieRouterControllers.getCategories = function(req, res) {
    Categorie.find({})
        .sort('description')
        .populate('User', 'email')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                categories: result,
            });
        });
};
categorieRouterControllers.getCategorie = function(req, res) {
    Categorie.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            categories: result,
        });
    });
};

categorieRouterControllers.postCategorie = function(req, res) {
    let id = req.user._id,
        description = req.body.description,
        newCategorie = new Categorie({
            description,
            User: id,
        });
    newCategorie.save((err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
            });
        }
        if (!result) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({ result });
    });
};

categorieRouterControllers.putCategorie = function(req, res) {
    let desc = req.body.description;
    Categorie.findByIdAndUpdate({ _id: req.params.id }, { description: desc }, { new: true, runValidators: true },
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                });
            }
            if (!result) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                created: result,
            });
        }
    );
};

categorieRouterControllers.deleteCategorie = function(req, res) {
    Categorie.findByIdAndRemove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        if (!result) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            deleted: result,
        });
    });
};

module.exports = categorieRouterControllers;