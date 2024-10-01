const app = require('express')()
const port = 8080
const swaggerDoc = require("./docs/swagger.json")
const swaggerUi = require("swagger-ui-express")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(port, () => {
    console.log(`API up at : http:/localhost:${port}`)
})