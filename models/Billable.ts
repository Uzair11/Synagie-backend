import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { User } from './User';


export interface BillableModel extends Sequelize.Model<BillableModel> {
    id: number,
    user_id: string,
    amount: number,
    description: string
}

export const Billable = sequelize.define('Billable', {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
        references: {
            model: User,
            key: 'user_id',
        }
    },
    amount: {
        type: Sequelize.DOUBLE(10, 2),
        allowNulls: false,
    },
    description: {
        type: Sequelize.STRING(255),
        allowNulls: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'Billable'
    })
