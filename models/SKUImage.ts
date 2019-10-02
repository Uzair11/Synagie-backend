import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { SKU } from './SKU';


export interface SKUImageModel extends Sequelize.Model<SKUImageModel> {
    id: number;
    sku_id: string;
    uploaded_datetime: Date;
    url: string;
}

export const SKUImage = sequelize.define('SKUImage', {
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    sku_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    uploaded_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    url: {
        type: Sequelize.STRING(2000),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SKUImage'
    })
