import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import {User} from './User';
import {ChargifyComponentId} from './ChargifyComponentId';


export interface ChargifyBillableModel extends Sequelize.Model<ChargifyBillableModel> {
    id: number,
    component_id: number,
    description: string,
    qty: number,
    status: string,
    created_at: string,
    updated_at: string,
    user_id: string
}

export const ChargifyBillable = sequelize.define('ChargifyBillable', {
    id: {
        type: Sequelize.INTEGER,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true
    },
    component_id: {
        type: Sequelize.INTEGER,
        allowNulls: false,
        references: {
            model: ChargifyComponentId,
            key: 'id'
        }
    },
    description: {
        type: Sequelize.STRING(255),
        allowNulls: false,
    },
    qty: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
    },
    status: {
        type: Sequelize.STRING(255),
        allowNulls: false,
        defaultValue: 'pending'
    },
    created_at: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: Sequelize.NOW
    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'ChargifyBillable'
    })
