// services/animalService.js
const db = require('../models');

class AnimalService {
  async getAllAnimals() {
    try {
      return await db.animals.findAll({
        include: [
          {
            model: db.species,
            as: 'Species',
            attributes: ['Name']
          },
          {
            model: db.owners,
            as: 'Owner',
            attributes: ['Name']
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching animals:', error);
      throw error;
    }
  }

  async getAnimalById(id) {
    try {
      return await db.animals.findOne({
        where: { Id: id },
        include: [
          {
            model: db.species,
            as: 'Species',
            attributes: ['Name']
          },
          {
            model: db.owners,
            as: 'Owner',
            attributes: ['Name']
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching animal:', error);
      throw error;
    }
  }

  async createAnimal(animalData) {
    try {
      return await db.animals.create(animalData);
    } catch (error) {
      console.error('Error creating animal:', error);
      throw error;
    }
  }

  async updateAnimal(id, animalData) {
    try {
      return await db.animals.update(animalData, { where: { Id: id } });
    } catch (error) {
      console.error('Error updating animal:', error);
      throw error;
    }
  }

  async deleteAnimal(id) {
    try {
      return await db.animals.destroy({ where: { Id: id } });
    } catch (error) {
      console.error('Error deleting animal:', error);
      throw error;
    }
  }
}

module.exports = new AnimalService();
