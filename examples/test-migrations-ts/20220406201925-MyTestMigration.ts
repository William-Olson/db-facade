import { QueryInterface, DataTypes } from 'sequelize';

export default {
  name: '20220406201925-MyTestMigration',

  up: (queryInterface: QueryInterface): Promise<any> => {
    return queryInterface.sequelize.transaction(
      async (transaction) => queryInterface.createTable('users', {
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
        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at'
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at'
        },
        deletedAt: {
          type: DataTypes.DATE,
          field: 'deleted_at'
        },
        type: DataTypes.INTEGER,
        isBetaMember: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          field: 'is_beta_member'
        }
      }, { transaction })
    );
  },

  down(queryInterface: QueryInterface): Promise<any> {
    return queryInterface.sequelize.transaction(
      async (transaction) => queryInterface.dropTable('User', { transaction })
    )
  }
}
