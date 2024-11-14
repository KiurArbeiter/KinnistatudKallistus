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
        },
        {
            // Other model options go here
        },
    );
    return Client;
}