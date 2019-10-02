import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface UserChannelModel extends Sequelize.Model<UserChannelModel> {
    channel_id: number;
    user_id: string;
    created_datetime: Date;
    account: string;
    credentials: string;
    order_sync: number;
    catalog_sync: number;
    stock_sync: number;
    access_token?: string;
    order_sync_enabled_time: Date;
}

export const UserChannel = sequelize.define('UserChannel', {
    channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Channel',
            key: 'channel_id'
        },

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    account: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    credentials: {
        type: Sequelize.TEXT,
        allowNull: false,

    },
    order_sync: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    catalog_sync: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    stock_sync: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    access_token: {
        type: Sequelize.TEXT,
        allowNull: true,

    },
    order_sync_enabled_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'UserChannel'
    })
