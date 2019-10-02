import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ChannelModel extends Sequelize.Model<ChannelModel> {
    channel_id: number,
    name: string,
    user_id: string,
    type: string
}

export const Channel = sequelize.define('Channel', {
    channel_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNulls: false,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNulls: false,
        unique: true
    },
    user_id: {
        type: Sequelize.STRING(10),
        allowNulls: true,
    },
    type: {
        type: Sequelize.STRING(10),
        allowNulls: false,
        defaultValue: 'normal'
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'Channel'
    })
