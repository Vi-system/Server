const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniquValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const Model = mongoose.model;
let validRole = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol valido"
};
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: validRole
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

userSchema.methods.encrypt = async(pwd) => {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pwd, salt);
};

userSchema.plugin(uniquValidator, { message: "El {PATH} debe ser unico." });

module.exports = Model("User", userSchema);