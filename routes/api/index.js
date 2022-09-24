const router = require("express").Router();

const noteRouters = require("./note");

router.use("/note", noteRouters);

module.exports = router;