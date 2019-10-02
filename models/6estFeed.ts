import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface _6estFeedModel extends Sequelize.Model<_6estFeedModel> {
    feedId: number,
    user_input: string,
    type: string,
    updated_at: string
    user_id: number
}

export const _6estFeed = sequelize.define('6est_feed', {
    feed_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNulls: false,
    },
    user_input: {
        type: Sequelize.STRING(200),
        allowNulls: true,
    },
    type: {
        type: Sequelize.STRING(20),
        allowNulls: true,
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNulls: false
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: '6est_feed'
    })
