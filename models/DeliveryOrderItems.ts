import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { SKU } from './SKU';

export interface DeliveryOrderItemsModel extends Sequelize.Model<DeliveryOrderItemsModel> {
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

export const DeliveryOrderItems = sequelize.define('DeliveryOrderItems', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'DeliveryOrderPending',
            key: 'order_id'
        },
    },
    sku_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },
    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    preferred_bin_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Bin',
            key: 'bin_id'
        },
    },
    selling_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,
    },
    retail_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,
    },
    discount_value: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,
    },
    gst: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,
    },
    service_fee: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'DeliveryOrderItems'
    })


DeliveryOrderItems.belongsTo(SKU, { foreignKey: 'sku_id', as: 'sku' });
