import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface B2BOrderItemsModel extends Sequelize.Model<B2BOrderItemsModel> {
    order_id: string,
    sku_id: string,
    quantity: number,
    preferred_bin_id: string,
    selling_price: number,
    retail_price: number,
    discount_value: number,
    gst: number,
    service_fee: number
}

export const B2BOrderItems = sequelize.define('B2BOrderItems', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
        primaryKey: true,
    },
    sku_id: {
        type: Sequelize.STRING(50),
        allowNulls: false,
        primaryKey: true,
    },
    preferredBin_id: {
        type: Sequelize.STRING(40),
        allowNulls: false,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNulls: false
    },
    selling_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNulls: true
    },
    retail_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNulls: true
    },
    discount_value: {
        type: Sequelize.DOUBLE(10, 2),
        allowNulls: true
    },
    gst: {
        type: Sequelize.DOUBLE(10, 2),
        allowNulls: true
    },
    service_fee: {
        type: Sequelize.DOUBLE(10, 2),
        allowNulls: true
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'B2BOrderItems'
    })
