import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface RestockPeriodModel extends Sequelize.Model<RestockPeriodModel> {
    period_id: number;
    from_time: string;
    to_time: string;
}

export const RestockPeriod = sequelize.define('RestockPeriod', {
    period_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,

    },
    from_time: {
        type: Sequelize.STRING(20),
        allowNull: false,

    },
    to_time: {
        type: Sequelize.STRING(20),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'RestockPeriod'
    })
