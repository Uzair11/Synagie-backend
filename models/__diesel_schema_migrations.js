/* jshint indent: 2 */

module.exports = function(sequelize, Sequelize) {
    return sequelize.define(
        '__diesel_schema_migrations',
        {
            version: {
                type: Sequelize.STRING(50),
                allowNull: false,
                primaryKey: true,
            },
            run_on: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            tableName: '__diesel_schema_migrations',
        },
    );
};
