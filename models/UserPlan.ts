import * as Sequelize from 'sequelize';
import * as sequelize from '../db/db';
import { Plan } from './Plan';

export interface UserPlanModel extends Sequelize.Model<UserPlanModel> {
    user_id: string;
    plan_id: string;
    subscribed_datetime: Date;
    subscription_id?: string;
}

export const UserPlan = sequelize.define('UserPlan', {
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    plan_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Plan',
            key: 'plan_id'
        },

    },
    subscribed_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',
        primaryKey: true,

    },
    subscription_id: {
        type: Sequelize.STRING(255),
        allowNull: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'UserPlan'
    })

UserPlan.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' })
