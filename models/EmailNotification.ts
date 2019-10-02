import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface EmailNotificationModel extends Sequelize.Model<EmailNotificationModel> {
    id: number;
    email: string;
    type: string;
}

export const EmailNotification = sequelize.define('EmailNotification', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    type: {
        type: Sequelize.STRING(255),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'EmailNotification'
    })
