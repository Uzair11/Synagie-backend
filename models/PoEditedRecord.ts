import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface PoEditedRecordModel extends Sequelize.Model<PoEditedRecordModel> {
    id: number;
    restock_id: string;
    po_completed_datetime: Date;
    edited_datetime: Date;
    repopulated_status: string;
}

export const PoEditedRecord = sequelize.define('PoEditedRecord', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    restock_id: {
        type: Sequelize.STRING(30),
        allowNull: false,

    },
    po_completed_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    edited_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00',

    },
    repopulated_status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'pending',

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'PoEditedRecord'
    })
