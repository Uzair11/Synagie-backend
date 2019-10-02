import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import {Channel} from './Channel';
import {DeliveryMethod} from './DeliveryMethod';


export interface ChannelDeliveryNameModel extends Sequelize.Model<ChannelDeliveryNameModel> {
    channel_id: number,
    method_id: number,
    display_name: string,
}

export const ChannelDeliveryName = sequelize.define('ChannelDeliveryName', {
    channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNulls: false,
        primaryKey: true,
        references: {
            model: Channel,
            key: 'channel_id'
        },
    },
    method_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNulls: false,
        references: {
            model: DeliveryMethod,
            key: 'method_id'
        },
    },
    display_name: {
        type: Sequelize.STRING(255),
        allowNulls: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ChannelDeliveryName'
    })
