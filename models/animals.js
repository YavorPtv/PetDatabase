// models/animals.js
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Animals = sequelize.define('animals', {
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
    SpeciesId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Breed: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Colour: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'animals',
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

  Animals.associate = function(models) {
    Animals.belongsTo(models.species, { as: 'Species', foreignKey: 'SpeciesId' });
    Animals.belongsTo(models.owners, { as: 'Owner', foreignKey: 'OwnerId' });
  };

  return Animals;
};
