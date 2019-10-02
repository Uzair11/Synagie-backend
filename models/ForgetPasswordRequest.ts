import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface ForgetPasswordRequestModel extends Sequelize.Model<ForgetPasswordRequestModel> {
    user_id: string;
    requested_datetime: Date;
    token: string;
}

export const ForgetPasswordRequest = sequelize.define('ForgetPasswordRequest', {
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    requested_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    token: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ForgetPasswordRequest'
    })
