import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface VendorModel extends Sequelize.Model<VendorModel> {
    vendor_id: string;
    user_id: string;
    order_counter: number;
    created_datetime: Date;
    contact_person: string;
    contact_number: string;
    company_name: string;
    email: string;
    address: string;
    address2: string;
    postal: string;
    country: string;
    gst?: any;
}

export const Vendor = sequelize.define('Vendor', {
    vendor_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    order_counter: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    contact_person: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    contact_number: {
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    company_name: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    email: {
        type: Sequelize.STRING(150),
        allowNull: false,

    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    address2: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    postal: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    country: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    gst: {
        type: "DOUBLE(10,4)",
        allowNull: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'Vendor'
    })
