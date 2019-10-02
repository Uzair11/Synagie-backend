import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface _6estFeedPlatformModel extends Sequelize.Model<_6estFeedPlatformModel> {
    pl_id: number,
    platform_id: number,
    platform_name: string,
    feed_id: number
}

export const _6estFeedPlatform = sequelize.define('6est_feed_platform', {
    pd_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNulls: false,
    },
    platform_id: {
        type: Sequelize.INTEGER,
        allowNulls: true,
    },
    feed_id: {
        type: Sequelize.INTEGER,
        allowNulls: true,
    },
    platform_name: {
        type: Sequelize.STRING(30),
        allowNulls: true,
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: '6est_feed_platform'
    })
