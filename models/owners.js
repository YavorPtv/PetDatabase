// models/owners.js
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Owners = sequelize.define('owners', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    City: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'owners',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });

  Owners.associate = function(models) {
    Owners.hasMany(models.animals, { as: 'Animals', foreignKey: 'OwnerId' });
  };

  return Owners;
};
