import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { Plan } from './Plan';
import { DeliveryWeightRange } from './DeliveryWeightRange';


export interface DeliveryMethod extends Sequelize.Model<DeliveryMethod> {
    method_id: number
    plan_id: string
    delivery_code: string
    delivery_name: string
    flat_fee: number
    divisor: number
    hj_carrier_name: string
    hj_service_level: string
}

export const DeliveryMethod = sequelize.define('DeliveryMethod', {
    method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: Plan,
            key: 'plan_id',
        },
    },
    delivery_code: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    delivery_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    flat_fee: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false
    },
    divisor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hj_carrier_name: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    hj_service_level: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'DeliveryMethod'
    })

DeliveryMethod.hasMany(DeliveryWeightRange, { foreignKey: 'method_id', as: 'delivery_weight_range' });
