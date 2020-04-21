const router = require("express").Router();
const {
    userDelete,
    userGet,
    userPost,
    userPut,
} = require("./routes.controller/user-router-controllers");
const { validToken, validRole } = require("../middlewares/auth");

router.get("/user", validToken, userGet);
router.post("/user", [validRole, validToken], userPost);
router.delete("/user/:id", [validRole, validToken], userDelete);
router.put("/user/:id", [validRole, validToken], userPut);

module.exports = router;