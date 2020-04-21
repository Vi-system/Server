const
    Product = require('../../models/products'),
    Categorie = require('../../models/categories'),
    productsRouterController = {};

productsRouterController.searchProduct = (req, res) => {
    let regex = new RegExp(req.params.search, 'i');
    Product
        .find({ name: regex })
        .populate({ path: 'categorie', select: 'description' })
        .exec((err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.status(201).json({
                ok: true,
                result
            });
        });
};

productsRouterController.getProducts = (req, res) => {

    let
        min = Number(req.query.min) || 0,
        count = Number(req.query.count) || 5,
        products = Product.find({ available: true })
        .skip(min)
        .limit(count)
        .populate({ path: 'categorie', select: 'description' })
        .populate({ path: 'user', select: 'name' })
        .exec((err, result) => {
            if (err) {
                return res.status(500).json({
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
                result
            });
        });
};
productsRouterController.getProduct = (req, res) => {
    let products = Product.findById(req.params.id)
        .populate({ path: 'categorie', select: 'description' })
        .populate({ path: 'user', select: 'name' })
        .exec((err, result) => {
            if (err) {
                return res.status(500).json({
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
                result
            });
        });
};
productsRouterController.postProduct = async(req, res) => {
    let
        body = req.body,
        id = req.user._id;
    Categorie.find({ description: body.categorie }, (err, result) => {
        if (err) {
            return res.status(500).json({
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
        let newProduct = new Product({
            name: body.name,
            priceUnit: body.priceUnit,
            description: body.description,
            available: body.available,
            categorie: result[0]._id,
            user: id
        });
        newProduct.save((err, result) => {
            if (err) {
                return res.status(500).json({
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
        });
        res.json({
            ok: true,
            newProduct
        });
    });


};
productsRouterController.putProduct = (req, res) => {
    let body = req.body;
    Product.findByIdAndUpdate(req.params.id, body, (err, result) => {
        if (err) {
            return res.status(500).json({
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
            result
        });
    });
};
productsRouterController.deleteProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { available: false }, { new: true }, (err, result) => {
        if (err) {
            return res.status(500).json({
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
            result
        });
    });
}
productsRouterController.inStockProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { available: true }, { new: true }, (err, result) => {
        if (err) {
            return res.status(500).json({
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
            result
        });
    });
}

module.exports = productsRouterController;