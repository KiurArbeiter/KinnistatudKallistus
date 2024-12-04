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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hugtype: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            // Other model options go here
        },
    );
    return Client;
}