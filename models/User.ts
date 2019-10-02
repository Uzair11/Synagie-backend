import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'
import { UserPlan } from './UserPlan';

export interface UserAddModel {
    email: string
    password: string
    user_role: string
    first_name: string
    last_name: string
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id: number
    email: string
    password: string
    created_at: string
    updated_at: string
}

export interface UserViewModel {
    id: number
    email: string
}

export const User = sequelize.define('User', {
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
    },
    user_role: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
    },
    hashpw: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
    },
    company: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    billing_address: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    postal_code: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    phone_number: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    stripe_id: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    is_banned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    stage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '1'
    },
    gst_reg: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    url: {
        type: Sequelize.STRING(2000),
        allowNull: true
    },
    fax_number: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    logo: {
        type: Sequelize.STRING(2000),
        allowNull: true
    },
    is_mt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    brand: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    vendor: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    onboarding: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '1'
    },
    big_data_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
    password_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    temppw: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'User'
    })

User.hasMany(UserPlan, { foreignKey: 'user_id', as: 'user_plan' });
