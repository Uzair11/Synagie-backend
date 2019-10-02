import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface SubAccountModel extends Sequelize.Model<SubAccountModel> {
    account_id: string;
    account_role: string;
    email: string;
    hashpw: string;
    first_name?: string;
    last_name?: string;
    created_datetime: Date;
    phone_number?: string;
    is_banned: number;
    user_id: string;
}

export const SubAccount = sequelize.define('SubAccount', {
    account_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,

    },
    account_role: {
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,

    },
    hashpw: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    first_name: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    last_name: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    phone_number: {
        type: Sequelize.STRING(50),
        allowNull: true,

    },
    is_banned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SubAccount'
    })
