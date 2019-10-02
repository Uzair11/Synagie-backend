import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ReplicateSKUModel extends Sequelize.Model<ReplicateSKUModel> {
    sku_id: string;
    user_id: string;
    created_datetime: Date;
}

export const ReplicateSKU = sequelize.define('ReplicateSKU', {
    sku_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ReplicateSKU'
    })
