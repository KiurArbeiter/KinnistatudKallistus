const {db} = requier("../db");
const {getBaseUrl} = requier("./utils");

expert.getAll = async (req, res) => {
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
        .location(`${getBaseUrl(req)}/hugs/${createdHug.id}`)
        .send(createdHug)
}