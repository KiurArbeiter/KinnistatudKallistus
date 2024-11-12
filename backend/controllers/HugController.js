const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const hugs = await db.hugs.findAll();
    res.send(hugs.map(({id, name}) => {
        return {id, name}
    }))
}

exports.create = async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    const newHug = {
        name: req.body.name,
        price: isNaN(newPrice) ? null : newPrice
    }
    const createdHug = await db.hugs.create(newHug);
    res.status(201)
        .location(`${Utils.getBaseUrl(req)}/hugs/${createdHug.id}`)
        .send(createdHug)
}

exports.deleteById = async (req, res) => {
    const hug = await getHug(req, res)
    if (!hug) { return }
    await hug.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const hug = await getHug(req, res)
    if (!hug) { return }
    return res.send(hug)
};

exports.editById = async (req, res) => {
    const hug = await getHug(req, res)
    if (!hug) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    hug.name = req.body.name
    hug.price = isNaN(newPrice) ? null : newPrice
    await hug.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/hugs/${hug.id}`)
        .send(hug)
};

const getHug = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const hug = await db.hugs.findByPk(idNumber)
    if (!hug) {
        res.status(404).send({error: `Hug Not Found!`})
        return null
    }
    return hug
}