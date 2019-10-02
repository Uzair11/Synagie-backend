import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { User } from './User';
import { DeliveryMethod } from './DeliveryMethod';
import { Channel } from './Channel';
import { DeliveryOrderItems } from './DeliveryOrderItems';

export interface DeliveryOrderPendingModel extends Sequelize.Model<DeliveryOrderPendingModel> {
    order_id: string
    order_counter: number
    user_id: string
    channel_id: number
    channel_order_id: string
    status: string
    created_datetime: string
    inserted_datetime: string
    delivery_datetime: string
    delivery_period: string
    method_id: number
    completed_datetime: string
    order_num: string
    recipient_name: string
    recipient_email: string
    address: string
    contact_no: string
    postal_code: string
    payment_mode: string
    discount_value: number
    coupon_value: number
    shipping_cost: number
    handling_cost: number
    gst: number
    sales_total: number
    special_request: string
    exchange_rate: number
    currency: string
    tax_id: string
    address_type: string
    state: string
    city: string
    country_code: string

}

export const DeliveryOrderPending = sequelize.define('DeliveryOrderPending', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true
    },
    order_counter: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    channel_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Channel,
            key: 'channel_id'
        }
    },
    channel_order_id: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    status: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    delivery_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    inserted_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    delivery_period: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: DeliveryMethod,
            key: 'method_id'
        }
    },
    completed_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    order_num: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    recipient_name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    recipient_email: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    contact_no: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    postal_code: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    payment_mode: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    discount_value: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    coupon_value: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0.00

    },
    shipping_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0.00

    },
    handling_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0.00

    },
    gst: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0.00

    },
    sales_total: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0.00

    },
    special_request: {
        type: Sequelize.STRING(2000),
        allowNull: true
    },
    exchange_rate: {
        type: Sequelize.DOUBLE(10, 4),
        allowNull: true,
        defaultValue: 1.0000
    },
    currency: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: 'SGD'
    },
    tax_id: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: ''
    },
    address_type: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: ''

    },
    state: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: ''
    },
    city: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: ''
    },
    country_code: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: 'SG'
    },
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'DeliveryOrderPending',
    })


// DeliveryOrderPending.belongsTo(DeliveryMethod, {foreignKey: 'method_id', as:'method_id'})
DeliveryOrderPending.belongsTo(DeliveryMethod, { foreignKey: 'method_id', as: 'delivery_method' })
DeliveryOrderPending.belongsTo(Channel, { foreignKey: 'channel_id', as: 'channel' })
DeliveryOrderPending.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
DeliveryOrderPending.hasMany(DeliveryOrderItems, { foreignKey: 'order_id', as: 'delivery_order_items'})
