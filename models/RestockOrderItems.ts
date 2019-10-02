import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface RestockOrderItemsModel extends Sequelize.Model<RestockOrderItemsModel> {
    order_id: string;
    sku_id: string;
    quantity: number;
    actual_quantity?: number;
    supplier_code?: string;
    barcode?: string;
    unit_cost?: any;
    total_cost?: any;
}

export const RestockOrderItems = sequelize.define('RestockOrderItems', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'RestockOrderPending',
            key: 'order_id'
        },

    },
    sku_id: {
        type: Sequelize.STRING(30),
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
    actual_quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,

    },
    supplier_code: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    barcode: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    unit_cost: {
        type: "DOUBLE(10,4)",
        allowNull: true,

    },
    total_cost: {
        type: "DOUBLE(10,4)",
        allowNull: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'RestockOrderItems'
    })
