const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const clients = await db.clients.findAll();
    res.send(clients.map(({id, name}) => {
        return {id, name}
    }))
}

exports.create = async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newClient = {
        name: req.body.name
    }
    const createdClient = await db.clients.create(newClient);
    res.status(201)
        .location(`${Utils.getBaseUrl(req)}/clients/${createdClient.id}`)
        .send(createdClient)
}

exports.deleteById = async (req, res) => {
    const client = await getClient(req, res)
    if (!client) { return }
    await client.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const client = await getClient(req, res)
    if (!client) { return }
    return res.send(client)
};

exports.editById = async (req, res) => {
    const client = await getClient(req, res)
    if (!client) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    client.name = req.body.name
    await client.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/clients/${client.id}`)
        .send(client)
};

const getClient = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const client = await db.clients.findByPk(idNumber)
    if (!client) {
        res.status(404).send({error: `Client Not Found!`})
        return null
    }
    return client
}