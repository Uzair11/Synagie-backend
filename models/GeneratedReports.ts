import * as Sequelize from 'sequelize'
import * as sequelize from '../db/db'


export interface GeneratedReportsModel extends Sequelize.Model<GeneratedReportsModel> {
    gen_id: number;
    user_id: string;
    file_path: string;
    added_time?: Date;
    completed_time?: Date;
    status: string;
}

export const GeneratedReports = sequelize.define('GeneratedReports', {
    gen_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,

    },
    user_id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'User',
            key: 'user_id'
        },

    },
    file_path: {
        type: Sequelize.STRING(200),
        allowNull: false,

    },
    added_time: {
        type: Sequelize.DATE,
        allowNull: true,

    },
    completed_time: {
        type: Sequelize.DATE,
        allowNull: true,

    },
    status: {
        type: Sequelize.STRING(10),
        allowNull: false,

    }
},
    {
        freezeTableName: true,
        timestamps: false,
        tableName: 'GeneratedReports'
    })
