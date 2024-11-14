require('dotenv').config();
const port = process.env.PORT || 3001;
const host = 'localhost'
const express = require("express")
const cors = require("cors")
const app = express()
const swaggerUi = require("swagger-ui-express")

const swaggerDoc = require("./docs/swagger.json")
const {sync} = require("./db");

app.use(cors());
app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://${host}:${port}/docs">/docs</a>`)
})

require("./routes/hugRoutes")(app)
require("./routes/clientRoutes")(app)

app.listen(port, async () => {
    if (process.env.SYNC === "true") { await sync(); }
    console.log(`API up at: http://${host}:${port}`)
})