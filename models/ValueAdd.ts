import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ValueAddModel extends Sequelize.Model<ValueAddModel> {
    plan_id: string;
    service: string;
    service_cost: any;
}

export const ValueAdd = sequelize.define('ValueAdd', {
    plan_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Plan',
            key: 'plan_id'
        },

    },
    service: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,

    },
    service_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ValueAdd'
    })
