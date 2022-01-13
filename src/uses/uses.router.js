const router = require("express").Router({mergeParams: true});
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:useId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;