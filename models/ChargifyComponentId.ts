import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ChargifyComponentIdModel extends Sequelize.Model<ChargifyComponentIdModel> {
    name: string,
    id  : number,
}

export const ChargifyComponentId = sequelize.define('ChargifyComponentId', {
    id: {
        type: Sequelize.INTEGER,
        allowNulls: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNulls: false
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ChargifyComponentId'
    })
