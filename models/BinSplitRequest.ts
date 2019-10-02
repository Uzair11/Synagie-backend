import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'

import {Bin} from './Bin';
import {User} from './User';

export interface BinSplitRequestModel extends Sequelize.Model<BinSplitRequestModel> {
    bin_id : string,
    user_id: string,
    created_datetime: string,
    quantity: number,
    status: string
}

export const BinSplitRequest = sequelize.define('BinSplitRequest', {
    bin_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
        primaryKey: true,
        references: {
            model: Bin,
            key: 'bin_id'
        }
    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNulls: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    created_datetime: {
        type: Sequelize.DATE,
        allowNulls: false,
        defaultValue : '0000-00-00 00:00:00'
    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNulls: false,
    },
    status: {
        type: Sequelize.STRING(10),
        allowNulls: false,
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'BinSplitRequest'
    })
