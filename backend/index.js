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
<<<<<<< Updated upstream
=======
const hugs = [
    {id: 1, name: "Short", price: 20.50},
    {id: 2, name: "Medium", price: 50.20},
    {id: 3, name: "Long", price: 70.00}
]
const clients = [
    {id: 1, name: "first", email: "1@gmail.1", hugtype: "Short"},
    {id: 2, name: "second", email: "2@gmail.2", hugtype: "Long"},
    {id: 3, name: "third", email: "3@gmail.3", hugtype: "Medium"}
]
const {db, sync} = require("./db");
>>>>>>> Stashed changes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://${host}:${port}/docs">/docs</a>`)
})

<<<<<<< Updated upstream
require("./routes/hugRoutes")(app)
require("./routes/clientRoutes")(app)
=======
app.get("/hugs", (req, res) => {
    res.send(hugs.map(({id,name,price}) => {
         return {id, name,price}
    }))
})
app.get("/clients", (req, res) => {
    res.send(clients.map(({id,name,email}) => {
         return {id, name,email}
    }))
})


app.get("/hugs/:id", (req, res) => {
    const hug = getHug(req, res)
    if (!hug) { return }
    return res.send(hug)
})
app.get("/clients/:id", (req, res) => {
    const client = getClient(req, res)
    if (!client) { return }
    return res.send(client)
})

app.delete("/hugs/:id", (req, res) => {
    const hug = getHug(req, res)
    if (!hug) { return }
    hugs.splice(hugs.indexOf(hug), 1)
    res.status(204).send()
})
app.delete("/clients/:id", (req, res) => {
    const client = getClient(req, res)
    if (!client) { return }
    clients.splice(clients.indexOf(client), 1)
    res.status(204).send()
})


app.put("/hugs/:id", (req, res) => {
    const hug = getHug(req, res);
    if (!hug) { return; }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({ error: "Missing required field 'name'" });
    }
    hug.name = req.body.name;
    
    if (req.body.price) {
        const newPrice = parseFloat(req.body.price);
        hug.price = isNaN(newPrice) ? null : newPrice;
    }
    
    res.send(hug);
});
app.put("/clients/:id", (req, res) => {
    const client = getClient(req, res);
    if (!client) { return; }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({ error: "Missing required field 'name'" });
    }
    client.name = req.body.name;
    client.email = req.body.email;
    
    res.send(client);
});


function getBaseUrl(req) {
    return (req.connection && req.connection.encrypted ? 'https' : 'http') + `://${req.headers.host}`
}
function createIdH() {
    const maxIdHug = hugs.reduce((prev, current) => (prev.id > current.id) ? prev : current, {id: 0});
    return maxIdHug.id + 1;
}
function createIdC() {
    const maxIdHug = clients.reduce((prev, current) => (prev.id > current.id) ? prev : current, {id: 0});
    return maxIdHug.id + 1;
}



app.post("/hugs", (req, res) => {
    if(!req.body.name || req.body.name.trim().lenght === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    hugs.push({
            id: createIdH(),
            name: req.body.name,
            price: isNaN(newPrice) ? null : newPrice
        }
    )
    res.send(hugs)
})
app.post("/clients", (req, res) => {
    if(!req.body.name || req.body.name.trim().lenght === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    clients.push({
            id: createIdC(),
            name: req.body.name,
            email: req.body.email,

        }
    )
    res.send(clients)
})
app.post("/assignHug", (req, res) => {
    const { clientEmail, hugId } = req.body;
  
    // Find the client by email
    const client = clients.find(client => client.email === clientEmail);
    if (!client) {
      return res.status(404).send({ error: 'Client not found' });
    }
  
    // Find the hug by id
    const hug = hugs.find(hug => hug.id === hugId);
    if (!hug) {
      return res.status(404).send({ error: 'Hug not found' });
    }


    client.hugtype += `, ${hug.name}`;
  
    // Return the updated client with the assigned hug
    res.send({
      message: "Hug successfully assigned",
      client: client // This is the updated client object with assigned hug
    });
  });
  
  



>>>>>>> Stashed changes

app.listen(port, async () => {
    if (process.env.SYNC === "true") { await sync(); }
    console.log(`API up at: http://${host}:${port}`)
})