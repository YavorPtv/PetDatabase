// models/species.js
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Species = sequelize.define('species', {
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
  }, {
    sequelize,
    tableName: 'species',
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

  Species.associate = function(models) {
    Species.hasMany(models.animals, { as: 'Animals', foreignKey: 'SpeciesId' });
  };

  return Species;
};
