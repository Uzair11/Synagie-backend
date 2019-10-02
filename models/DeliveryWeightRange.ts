import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface DeliveryWeightRangeModel extends Sequelize.Model<DeliveryWeightRangeModel> {
    method_id: number
    lower_bound: any
    upper_bound: any
    price: any
}

export const DeliveryWeightRange = sequelize.define('DeliveryWeightRange', {
    method_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'DeliveryMethod',
            key: 'method_id'
        },

    },
    lower_bound: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        primaryKey: true,

    },
    upper_bound: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,

    },
    price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'DeliveryWeightRange'
    })
