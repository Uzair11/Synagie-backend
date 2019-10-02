import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface SKUTagModel extends Sequelize.Model<SKUTagModel> {
    sku_id: string;
    tag: string;
}

export const SKUTag = sequelize.define('SKUTag', {
    sku_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    tag: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SKUTag'
    })
