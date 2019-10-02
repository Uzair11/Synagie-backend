import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface WithdrawalOrderPendingModel extends Sequelize.Model<WithdrawalOrderPendingModel> {
    order_id?: string;
    order_counter: number;
    user_id: string;
    channel_id?: number;
    status?: string;
    created_datetime: Date;
    delivery_datetime: Date;
    delivery_period?: string;
    method_id: number;
    completed_datetime: Date;
    order_num?: string;
    recipient_name?: string;
    recipient_email?: string;
    address?: string;
    contact_no?: string;
    postal_code?: string;
    special_request?: string;
    inserted_datetime: Date;
}

export const WithdrawalOrderPending = sequelize.define('WithdrawalOrderPending', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true,

    },
    order_counter: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,

    },
    channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,

    },
    status: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    delivery_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    delivery_period: {
        type: Sequelize.STRING(20),
        allowNull: true,

    },
    method_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,

    },
    completed_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    order_num: {
        type: Sequelize.STRING(1000),
        allowNull: true,

    },
    recipient_name: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    recipient_email: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    contact_no: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    postal_code: {
        type: Sequelize.STRING(10),
        allowNull: true,

    },
    special_request: {
        type: Sequelize.STRING(2000),
        allowNull: true,

    },
    inserted_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'WithdrawalOrderPending'
    })
