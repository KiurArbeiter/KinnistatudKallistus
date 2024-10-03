const app = require('express')()
const host = 'localhost'
const port = 8080
const swaggerDoc = require("./docs/swagger.json")
const swaggerUi = require("swagger-ui-express")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href='http://${host}:${port}/docs'> /docs</>`)
})

app.get("/hugs", (req, res) => {
    res.send(["short", "long"])
})




app.listen(port, () => {
    console.log(`API up at : http:/localhost:${port}`)
})