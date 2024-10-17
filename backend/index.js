require('dotenv').config();
const port = process.envPORT || 3001;
const host = 'localhost'
const express = require("express")
const app = express()
const swaggerDoc = require("./docs/swagger.json")
const swaggerUi = require("swagger-ui-express")



app.use(express.json())
const hugs = [
    {id: 1, name: "Short", price: 20.50},
    {id: 2, name: "Medium", price: 50.20},
    {id: 3, name: "Long", price: 70.00}
]

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href='http://${host}:${port}/docs'> /docs</a>`)
})

app.get("/hugs", (req, res) => {
    res.send(hugs.map(({id,name}) => {
         return {id, name}
    }))
})

app.get("/hugs/:id", (req, res) => {
    const hug = getHug(req, res)
    if (!hug) { return }
    return res.send(hug)
})

app.delete("/hugs/:id", (req, res) => {
    const hug = getHug(req, res)
    if (!hug) { return }
    hugs.splice(hugs.indexOf(hug), 1)
    res.status(204).send()
})


app.put("/hugs/:id", (req, res) => {
    const hug = getHug(req, res)
    if (!hug) { return }
    
})


function createId() {
    const maxIdHug = hugs.reduce((prev, current) => (prev.id > current.id) ? prev : current, 1)
    return maxIdHug + 1;
}

function getBaseUrl(req) {
    return (req.connection && req.connection.encrypted ? 'https' : 'http') + `://${req.headers.host}`
}


app.post("/hugs", (req, res) => {
    if(!req.body.name || req.body.name.trim().lenght === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    const newHug = {
            id: createId(),
            name: req.body.name,
            price: isNaN(newPrice) ? null : newPrice
        }
    hugs.push(newHug)
    res.status(201)
    .location(`${getBaseUrl(req)}/hugs/${newHug.id}`)
    .send(newHug)
})



app.listen(port, () => {
    require("./db")
    console.log(`API up at : http:/localhost:${port}`)
})

function getHug(req, res) {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be whole number ${req.params.id}`})
        return null
    }
    const hug = hugs.find(g => g.id === idNumber)
    if (!hug) {
        res.status(404).send({error: `Hug Not Found!`})
        return null
    }
    return hug
}
