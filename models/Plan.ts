import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface PlanModel extends Sequelize.Model<PlanModel> {
    plan_id: string
    plan_name: string
    bin_amount: number
    add_amount: number
    price: number
    per_restock_item: number
    per_restock_item_discount: number
    restock_discount_threshold: number
    per_delivery: number
    delivery_item_threshold: number
    per_delivery_item: number
}


export const Plan = sequelize.define('Plan', {
    plan_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    plan_name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    add_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bin_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false
    },
    per_restock_item: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false
    },
    per_restock_item_discount: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false
    },
    restock_discount_threshold: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    per_delivery: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false
    },
    delivery_item_threshold: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    per_delivery_item: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'Plan'
    })
