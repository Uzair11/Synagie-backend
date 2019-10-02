import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface APITokenModel extends Sequelize.Model<APITokenModel> {
    name: string,
    token: string,
    created_datetime: string,
}

export const APIToken = sequelize.define('APIToken', {
    name: {
        type: Sequelize.STRING(50),
        allowNulls: false,
        primaryKey: true,
    },
    token: {
        type: Sequelize.STRING(50),
        allowNulls: false
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNulls: false
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'APIToken'
    })
