import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import {Channel} from './Channel';


export interface OrderBackLogModel extends Sequelize.Model<OrderBackLogModel> {
    id: number;
    user_id: string;
    request_data?: string;
    created_at: Date;
    channel_order_id: string;
    order_num?: string;
    channel_id: number;
    reason?: string;
    details?: string;
}

export const OrderBackLog = sequelize.define('OrderBackLog', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    request_data: {
        type: Sequelize.TEXT,
        allowNull: true,

    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    channel_order_id: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    order_num: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Channel',
            key: 'channel_id'
        },

    },
    reason: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    details: {
        type: Sequelize.STRING(255),
        allowNull: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'OrderBackLog'
    })

OrderBackLog.belongsTo(Channel, {foreignKey: 'channel_id', as: 'channel'})
