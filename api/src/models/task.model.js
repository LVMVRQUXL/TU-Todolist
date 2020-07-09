module.exports = (sequelize, DataTypes) => sequelize.define('Task', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: true
});
