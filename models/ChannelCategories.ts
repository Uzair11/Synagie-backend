import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { Channel } from './Channel';

export interface ChannelCategoriesModel extends Sequelize.Model<ChannelCategoriesModel> {
    channel_id: number,
    category: string,
}

export const ChannelCategories = sequelize.define('ChannelCategories', {
    channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNulls: false,
        primaryKey: true,
        references: {
            model: Channel,
            key: 'channel_id'
        }
    },
    category: {
        type: Sequelize.STRING(150),
        allowNulls: false,
        primaryKey: true,
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ChannelCategories'
    })
