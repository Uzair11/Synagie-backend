import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface UserOldPasswordModel extends Sequelize.Model<UserOldPasswordModel> {
    user_id: string;
    old_password: string;
    created_dt: Date;
}

export const UserOldPassword = sequelize.define('UserOldPassword', {
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,

    },
    old_password: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    created_dt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'UserOldPassword'
    })
