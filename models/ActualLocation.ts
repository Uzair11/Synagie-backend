import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ActualLocationModel extends Sequelize.Model<ActualLocationModel> {
    warehouse_code: string,
    location_code: string,
}

export const ActualLocation = sequelize.define('ActualLocation', {
    warehouse_code: {
        type: Sequelize.STRING(10),
        allowNulls: false,
        primaryKey: true,
    },
    location_code: {
        type: Sequelize.STRING(55),
        allowNulls: false,
        primaryKey: true,
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ActualLocation'
    })
