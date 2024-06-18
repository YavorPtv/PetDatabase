// controllers/animals.js
var express = require('express');
var router = express.Router();

const db = require('../models/index');
const animalService = require('../services/animalService');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAdmin = require('../middleware/ensureAdmin');

/**
 * Get all animals
 */
router.get('/', async (req, res, next) => {
  try {
    const animalList = await animalService.getAllAnimals();
    res.render('display-animals', { data: animalList });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

/**
 * Show view to add new animal
 */
router.get('/new', ensureAuthenticated, ensureAdmin, async function (req, res, next) {
  try {
    const speciesList = await db.species.findAll(); // Fetch all species
    const ownersList = await db.owners.findAll();   // Fetch all owners
  
    res.render('add-animal', { speciesList, ownersList });
  } catch (error) {
    next(error);
  }
});

/**
 * Add a new animal to the database
 */
router.post('/new', ensureAuthenticated, ensureAdmin, async (req, res, next) => {
  try {
    await animalService.createAnimal({
      Name: req.body.name,
      SpeciesId: req.body.speciesId,
      OwnerId: req.body.ownerId,
      Breed: req.body.breed,
      Age: req.body.age,
      Colour: req.body.colour
    });
    res.redirect('/animals');
  } catch (error) {
    console.error('Error adding animal:', error);
    res.status(500).send('Error adding animal');
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    res.render('display-animals', { data: [animal] });
  } catch (error) {
    console.error('Error fetching animal:', error);
  }
});

router.get('/:id/edit', ensureAuthenticated, ensureAdmin, async (req, res, next) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    res.render('edit-animal', { data: animal });
  } catch (error) {
    console.error('Error fetching animal:', error);
  }
});

router.post('/:id/edit', ensureAuthenticated, ensureAdmin, async (req, res, next) => {
  try {
    const { name, speciesId, ownerId, breed, age, colour } = req.body;

    await animalService.updateAnimal(req.params.id, {
      Name: name,
      SpeciesId: speciesId,
      OwnerId: ownerId,
      Breed: breed,
      Age: age,
      Colour: colour,
    });

    res.redirect('/animals');
  } catch (error) {
    console.error('Error editing item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Delete an animal
 */
router.get('/:id/delete', ensureAuthenticated, ensureAdmin, async (req, res, next) => {
  try {
    await animalService.deleteAnimal(req.params.id);
    res.redirect('/animals');
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
