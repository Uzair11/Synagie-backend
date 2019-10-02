import * as Sequelize from 'sequelize';
import * as sequelize from '../db/db';

import {User} from './User';
import {Channel} from './Channel';
import {DeliveryMethod} from './DeliveryMethod';

export interface ChannelDefaultDeliveryModel extends Sequelize.Model<ChannelDefaultDeliveryModel> {
    user_id: string,
    channel_id: number,
    method_id: number,
}

export const ChannelDefaultDelivery = sequelize.define('ChannelDefaultDelivery', {
    user_id: {
        type: Sequelize.STRING(50),
        allowNulls: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        },
    },
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
},
{
    freezeTableName: true,
    timestamps: false,
    tableName: 'ChannelDefaultDelivery'
});


ChannelDefaultDelivery.belongsTo(DeliveryMethod, {foreignKey: 'method_id', as: 'delivery_method'});
