const { Sequelize, DataTypes, Association } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: (...msg) => console.log(msg), 
    
  });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.hugs = require(".models/Hug")(sequelize, DataTypes);

const sync = (async () => {
  await sequelize.sync({force : true});
  console.log("All models were syncronized")
})();

module.exports = {db, sync};