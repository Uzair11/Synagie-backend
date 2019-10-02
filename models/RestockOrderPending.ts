import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface RestockOrderPendingModel extends Sequelize.Model<RestockOrderPendingModel> {
    order_id: string;
    order_reference_number: string;
    user_id: string;
    status: string;
    created_datetime: Date;
    arrival_datetime: Date;
    arrival_period: string;
    method: string;
    pickup_name?: string;
    pickup_address?: string;
    pickup_contact?: string;
    special_request: string;
    payment_terms?: string;
    currency?: string;
    exchange_rate?: any;
    gst?: any;
    vendor_id?: string;
}

export const RestockOrderPending = sequelize.define('RestockOrderPending', {
    order_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,

    },
    order_reference_number: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    status: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    arrival_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    arrival_period: {
        type: Sequelize.STRING(20),
        allowNull: false,

    },
    method: {
        type: Sequelize.STRING(30),
        allowNull: false,

    },
    pickup_name: {
        type: Sequelize.STRING(200),
        allowNull: true,

    },
    pickup_address: {
        type: Sequelize.STRING(200),
        allowNull: true,

    },
    pickup_contact: {
        type: Sequelize.STRING(20),
        allowNull: true,

    },
    special_request: {
        type: Sequelize.STRING(2000),
        allowNull: false,

    },
    payment_terms: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    currency: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    exchange_rate: {
        type: "DOUBLE(10,4)",
        allowNull: true,

    },
    gst: {
        type: "DOUBLE(10,4)",
        allowNull: true,

    },
    vendor_id: {
        type: Sequelize.STRING(30),
        allowNull: true,
        references: {
            model: 'Vendor',
            key: 'vendor_id'
        },

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'RestockOrderPending'
    })
