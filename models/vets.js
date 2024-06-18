const Sequelize = require('sequelize');
const validatePhone = (phoneNumber) => {
  const phoneValidationRegex = /^(\+359|0)\d{7,9}$/;
  return phoneValidationRegex.test(phoneNumber);
}

module.exports = function(sequelize, DataTypes) {
  const Vets = sequelize.define('vets', {
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
    License: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Started: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        validatePhone(value) {
          if (!validatePhone(value)) {
            throw new Error('Invalid phone number');
          }
        }
      }
    }
  }, {
    sequelize,
    tableName: 'vets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      }
    ]
  });

  return Vets;
};