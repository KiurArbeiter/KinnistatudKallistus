const HugsController = require("../controllers/HugController");
module.exports = (app) => {
    app.route("/hugs")
        .get(HugsController.getAll)
        .post(HugsController.create);
    app.route("/hugs/:id")
        .get(HugsController.getById)
        .put(HugsController.editById)
        .delete(HugsController.delete.ById);
}