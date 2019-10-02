import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ContactUsRequestModel extends Sequelize.Model<ContactUsRequestModel> {
    id: number,
    email: string,
    created_datetime: string,
    message: string
}

export const ContactUsRequest = sequelize.define('ContactUsRequest', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNulls: false
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    message: {
        type: Sequelize.STRING(2000),
        allowNulls: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ContactUsRequest'
    })
