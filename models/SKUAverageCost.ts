import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface SKUAverageCostModel extends Sequelize.Model<SKUAverageCostModel> {
    id: number;
    sku_id: string;
    legacy_code: string;
    current_quantity: number;
    current_cost: any;
    po_number: string;
    po_quantity: number;
    po_cost: any;
    sales_quantity_between_po: number;
    updated_datetime: Date;
}

export const SKUAverageCost = sequelize.define('SKUAverageCost', {
    id: {
        type: Sequelize.INTEGER,
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
    legacy_code: {
        type: Sequelize.STRING(30),
        allowNull: false,

    },
    current_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    current_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,

    },
    po_number: {
        type: Sequelize.STRING(30),
        allowNull: false,

    },
    po_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    po_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,

    },
    sales_quantity_between_po: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    updated_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SKUAverageCost'
    })
