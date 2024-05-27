var express = require('express');
var router = express.Router();

const db = require('../models/index');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAdmin = require('../middleware/ensureAdmin');

/**
 * Get all animals
 */
router.get('/', async (req, res, next) => {
	try{
		const animalList = await db.animals.findAll();
		res.render('display-animals', {data: animalList});
	}
	catch(error){
		console.error('Error fetching data:', error);
	}
    
});

/**
 * Show view to add new animal
 */
router.get('/new', ensureAdmin, ensureAuthenticated, async function (req, res, next) {
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
router.post('/new', ensureAuthenticated, ensureAdmin, function (req, res, next) {
    // Example of adding a new animal
    db.animals.create({
        Name: req.body.name,
        SpeciesId: req.body.speciesId,
        OwnerId: req.body.ownerId,
        Breed: req.body.breed,
        Age: req.body.age,
        Colour: req.body.colour
    }).then(() => res.redirect('/animals'))
      .catch(error => {
        console.error('Error adding animal:', error);
        res.status(500).send('Error adding animal');
    });
});

router.get('/:id', async (req, res, next) => {
	const animalId = req.params.id;

	const animal = await db.animals.findAll({
		where: {
			id: [animalId]
		}
	})
	res.render('display-animals', {data: animal});
});

router.get('/:id/edit', ensureAdmin, ensureAuthenticated, async (req, res, next) => {
	const animalId = req.params.id;

	const animal = await db.animals.findAll({
		where: {
			id: [animalId]
		}
	})
	res.render('edit-animal', {data: animal});
});

router.post('/:id/edit', ensureAdmin, ensureAuthenticated, async (req, res, next) => {
	try {
		const { name, speciesId, ownerId, breed, age, colour } = req.body;

		await db.animals.update(
			{
				Name: name,
				SpeciesId: speciesId,
				OwnerId: ownerId,
				Breed: breed,
				Age: age,
				Colour: colour,
			},
			{ where: { id: req.params.id } }
		);

		res.redirect('/animals');
	} catch (error) {
		console.error('Error editing item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
})

/**
 * Delete an animal
 */
router.get('/:id/delete', ensureAdmin, ensureAuthenticated, async (req, res, next) =>{
    await db.animals.destroy({
		where:{
			Id: req.params.id,
		}
	});
	res.redirect('/animals');
});

module.exports = router;