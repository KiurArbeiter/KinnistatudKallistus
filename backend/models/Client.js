module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define(
        'Client',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
<<<<<<< Updated upstream
=======
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hugtype: {
                type: DataTypes.STRING,
                allowNull: true,
            }
>>>>>>> Stashed changes
        },
        {
            // Other model options go here
        },
    );
    return Client;
}