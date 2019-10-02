import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface B2BOrderPendingModel extends Sequelize.Model<B2BOrderPendingModel> {
    order_id: string,
    order_counter: number,
    user_id: string,
    channel_id: number,
    channel_order_id: string,
    status: string,
    created_datetime: string,
    updated_datetime: string,
    delivery_period: string,
    method_id: number,
    completed_datetime : string,
    order_num: string,
    recipient_name: string,
    recipient_email: string,
    address: string,
    contact_no: string,
    postal_code: string,
    payment_mode: string,
    discount_value: number,
    coupon_value: number,
    shipping_cost: number,
    handling_cost: number,
    gst: number,
    sales_total: number,
    special_request: number,
    inserted_datetime: string,
    order_type: string,
    payment_term: string,
    currency: string,
    exchange_rate: number,
    bin_type: number
}

export const B2BOrderPending = sequelize.define('B2BOrderPending', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNulls: true,
        unique: true,
    },
    order_counter: {
        type: Sequelize.INTEGER,
        allowNulls: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
    },
    channel_id: {
        type: Sequelize.INTEGER,
        allowNulls: true,
    },
    channel_order_id: {
        type: Sequelize.STRING(1000),
        allowNulls: true,
    },
    status: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: Sequelize.NOW
    },
    delivery_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: Sequelize.NOW
    },
    delivery_period: {
        type: Sequelize.STRING(20),
        allowNulls: true,
    },
    method_id: {
        type: Sequelize.INTEGER,
        allowNulls: false,
    },
    completed_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: Sequelize.NOW
    },
    order_num: {
        type: Sequelize.STRING(1000),
        allowNulls: true,
    },
    recipient_name: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    recipient_email: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    address: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    contact_no: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    postal_code: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    payment_mode: {
        type: Sequelize.STRING(255),
        allowNulls: true,
    },
    discount_value: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
        defaultValue: 0.00
    },
    coupon_value: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
        defaultValue: 0.00
    },
    gst: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
        defaultValue: 0.00
    },
    shipping_cost: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
        defaultValue: 0.00
    },
    handling_cost: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
        defaultValue: 0.00
    },
    sales_total: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: false,
        defaultValue: 0.00
    },
    special_request: {
        type: Sequelize.STRING(2000),
        allowNulls: true,
    },
    inserted_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue: Sequelize.NOW
    },
    order_type: {
        type: Sequelize.STRING(50),
        allowNulls: true,
        defaultValue: 'Normal'
    },
    payment_term: {
        type: Sequelize.STRING(100),
        allowNulls: true,
    },
    currency: {
        type: Sequelize.STRING(100),
        allowNulls: true,
    },
    exchange_rate: {
        type: Sequelize.DOUBLE(10,2),
        allowNulls: true,
    },
    bin_type: {
        type: Sequelize.INTEGER,
        allowNulls: false,
    }
},
    {
        indexes: [
            {
                name: 'user_id_2',
                unique: true,
                fields: ['user_id', 'channel_id', 'channel_order_id']
            }
        ],
        freezeTableName: true,
        timestamps: false,
        tableName: 'B2BOrderPending'
    })
