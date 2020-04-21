const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es necesario'] },
    priceUnit: { type: Number, required: [true, 'El precio únitario es necesario'] },
    description: { type: String, required: false },
    image: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    categorie: { type: Schema.Types.ObjectId, ref: 'Categorie', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = model('Producto', productoSchema);