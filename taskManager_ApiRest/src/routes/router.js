const router = require("express").Router();
const tasksRouter = require("./tasks");

router.use("/", tasksRouter);

module.exports = router;