import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface SkuvaultWarehousesModel extends Sequelize.Model<SkuvaultWarehousesModel> {
    id: number;
    name: string;
}

export const SkuvaultWarehouses = sequelize.define('SkuvaultWarehouses', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'SkuvaultWarehouses'
    })
