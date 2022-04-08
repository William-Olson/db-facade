import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    type: number;
    isBetaMember: boolean;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'isBetaMember'> { }
export interface UserOuput extends Required<UserAttributes> { }

export default class User extends Model<UserAttributes, UserInput> implements UserAttributes {

    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public type!: number;
    public isBetaMember!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static register(sequelize: Sequelize) {
        User.init({
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
                field: 'first_name'
            },
            lastName: {
                type: DataTypes.STRING,
                field: 'last_name'
            },
            type: DataTypes.INTEGER,
            isBetaMember: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
                field: 'is_beta_member'
            }
        }, {
            sequelize,
            tableName: 'users',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true
        })
    }

}
