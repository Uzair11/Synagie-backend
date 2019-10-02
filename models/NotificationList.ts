import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface NotificationListModel extends Sequelize.Model<NotificationListModel> {
    id: number;
    email: string;
    role: string;
}

export const NotificationList = sequelize.define('NotificationList', {
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
    role: {
        type: Sequelize.STRING(11),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'NotificationList'
    })
