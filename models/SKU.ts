import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import { SKUImage } from './SKUImage';

export interface SKUModel extends Sequelize.Model<SKUModel> {
    sku_id: string;
    user_id: string;
    order_counter: number;
    product_name: string;
    legacy_code?: string;
    item_brand: string;
    seller_item_sku?: string;
    seller_item_code?: string;
    created_datetime: Date;
    description?: string;
    cost_price?: any;
    retail_price?: any;
    selling_price?: any;
    agreed_price?: any;
    item_length?: any;
    item_width?: any;
    item_height?: any;
    weight?: any;
    is_kit: number;
    updated_at?: Date;
    category?: string;
    inventory_cost?: any;
    storage_cost?: any;
    holding_cost?: any;
    vendor_id?: string;
    consignment: number;
    low_stock_quantity: number;
    disabled: number;
    carton_quantity?: number;
    available_quantity: number;
    pending_quantity: number;
    stock_quantity: number;
    item_type?: string;
    origin_country?: string;
    hs_code?: string;
    shelf_life?: number;
    expiry_date_control: number;
}

export const SKU = sequelize.define('SKU', {
    sku_id: {
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
    product_name: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    legacy_code: {
        type: Sequelize.STRING(30),
        allowNull: true,

    },
    item_brand: {
        type: Sequelize.STRING(255),
        allowNull: false,

    },
    seller_item_sku: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    seller_item_code: {
        type: Sequelize.STRING(255),
        allowNull: true,

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
    cost_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    retail_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    selling_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    agreed_price: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    item_length: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    item_width: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    item_height: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    weight: {
        type: "DOUBLE(10,3)",
        allowNull: true,

    },
    is_kit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),

    },
    category: {
        type: Sequelize.STRING(255),
        allowNull: true,

    },
    inventory_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    storage_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    holding_cost: {
        type: Sequelize.DOUBLE(10, 2),
        allowNull: true,

    },
    vendor_id: {
        type: Sequelize.STRING(30),
        allowNull: true,
        references: {
            model: 'Vendor',
            key: 'vendor_id'
        },

    },
    consignment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    low_stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    disabled: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    carton_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,

    },
    available_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    pending_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    },
    item_type: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: '',

    },
    origin_country: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: '',

    },
    hs_code: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: '',

    },
    shelf_life: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: '0',

    },
    expiry_date_control: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SKU'
    })


SKU.hasOne(SKUImage, {foreignKey: 'sku_id', as: 'sku_image'})
