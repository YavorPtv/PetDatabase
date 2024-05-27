const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize').DataTypes;

function initModels(sequelize) {
  const basename = path.basename(__filename);
  const excludeFiles = ['__efmigrationshistory.js', 'index.js'];  // List of files to exclude

  const models = {};

  fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) &&   // Skip hidden files
             (file !== basename) &&         // Skip this file (init-models.js)
             (file.slice(-3) === '.js') &&  // Only process .js files
             !excludeFiles.includes(file);  // Exclude specific files
    })
    .forEach(file => {
      const modelPath = path.join(__dirname, file);
      const initializeModel = require(modelPath);
      if (typeof initializeModel !== 'function') {
        throw new Error(`Model initializer must be a function, check the export of file: ${file}`);
      }
      const model = initializeModel(sequelize, Sequelize);
      if (!model.name) {
        throw new Error(`Model must have a name property, check the definition in file: ${file}`);
      }
      models[model.name] = model;
    });

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
