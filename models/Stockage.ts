import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface StockageModel extends Sequelize.Model<StockageModel> {
    id: number;
    bin_id: string;
    user_id: string;
    assigned_datetime: Date;
    sku_id?: string;
    priority: number;
    quantity: number;
    low_limit: number;
    lot_no?: string;
    expiry_datetime?: Date;
    description?: string;
    warehouse_id?: string;
    pending_restock: number;
    reserved: number;
    last_inbound_datetime?: Date;
}

export const Stockage = sequelize.define('Stockage', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    bin_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'Bin',
            key: 'bin_id'
        },

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    assigned_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    sku_id: {
        type: Sequelize.STRING(30),
        allowNull: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    priority: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '100',

    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',

    },
    low_limit: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '0',

    },
    lot_no: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    expiry_datetime: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: '0000-00-00 00:00:00',

    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,

    },
    warehouse_id: {
        type: Sequelize.STRING(20),
        allowNull: true,

    },
    pending_restock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    reserved: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    last_inbound_datetime: {
        type: Sequelize.DATE,
        allowNull: true,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'Stockage'
    })
