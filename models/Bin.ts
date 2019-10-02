import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface BinModel extends Sequelize.Model<BinModel> {
    bin_id: string,
    status: string,
    created_datetime: string,
}

export const Bin = sequelize.define('Bin', {
    bin_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
        primaryKey: true,
    },
    status: {
        type: Sequelize.STRING(20),
        allowNulls: false
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue : '0000-00-00 00:00:00'
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'Bin'
    })
