const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('__efmigrationshistory', {
    MigrationId: {
      type: DataTypes.STRING(150),
      allowNull: false,
      primaryKey: true
    },
    ProductVersion: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: '__efmigrationshistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MigrationId" },
        ]
      },
    ]
  });
};
