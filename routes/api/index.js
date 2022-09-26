const router = require("express").Router();

const noteRouters = require("./note");

router.use("/notes", noteRouters);

module.exports = router;