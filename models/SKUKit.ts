import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface SKUKitModel extends Sequelize.Model<SKUKitModel> {
    sku_id: string;
    child_sku_id: string;
    quantity: number;
}

export const SKUKit = sequelize.define('SKUKit', {
    sku_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    childSku_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SKUKit'
    })
