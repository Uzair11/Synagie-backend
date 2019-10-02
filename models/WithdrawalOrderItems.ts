import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface WithdrawalOrderItemsModel extends Sequelize.Model<WithdrawalOrderItemsModel> {
    order_id: string;
    sku_id: string;
    quantity: number;
    preferred_bin_id: string;
}

export const WithdrawalOrderItems = sequelize.define('WithdrawalOrderItems', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
    },
    sku_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    preferred_bin_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'WithdrawalOrderItems'
    })
