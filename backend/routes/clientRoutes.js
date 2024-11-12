const ClientsController = require("../controllers/ClientController");
module.exports = (app) => {
    app.route("/hugs")
        .get(ClientsController.getAll)
        .post(ClientsController.create);
    app.route("/clients/:id")
        .get(ClientsController.getById)
        .put(ClientsController.editById)
        .delete(ClientsController.delete.ById);
}