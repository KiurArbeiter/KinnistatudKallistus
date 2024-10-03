const app = require('express')()
const host = 'localhost'
const port = 8080
const swaggerDoc = require("./docs/swagger.json")
const swaggerUi = require("swagger-ui-express")

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
    res.send(hugs.map((h) => h.name))
})


app.get("/hugs/:id", (req, res) => {
    res.send(hugs[req.params.id])
})



app.listen(port, () => {
    console.log(`API up at : http:/localhost:${port}`)
})