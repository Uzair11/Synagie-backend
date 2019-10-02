import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface SKUChannelModel extends Sequelize.Model<SKUChannelModel> {
    sku_id: string;
    channel_id: number;
    category?: string;
    product_name: string;
    created_datetime: Date;
    description?: string;
    retail_price?: any;
    selling_price: any;
    discount_value?: any;
    commission_rate?: any;
    active: number;
}

export const SKUChannel = sequelize.define('SKUChannel', {
    sku_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'SKU',
            key: 'sku_id'
        },

    },
    channel_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Channel',
            key: 'channel_id'
        },

    },
    category: {
        type: Sequelize.STRING(150),
        allowNull: true,
        references: {
            model: 'ChannelCategories',
            key: 'category'
        },

    },
    product_name: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,

    },
    retail_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    selling_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: false,

    },
    discount_value: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    commission_rate: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SKUChannel'
    })
