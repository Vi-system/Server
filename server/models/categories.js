const { Schema, model } = require('mongoose');

const categorieSchema = new Schema({
    description: {
        type: String,
        require: [true, 'Description is REQUIRED'],
        unique: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Categorie', categorieSchema);