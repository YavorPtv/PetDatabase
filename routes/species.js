var express = require('express');
var router = express.Router();

const db = require('../models/index');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAdmin = require('../middleware/ensureAdmin');

router.get('/', async (req, res, next) => {
	try{
		const speciesList = await db.species.findAll();
		res.render('display-species', {data: speciesList});
	}
	catch(error){
		console.error('Error fetching data:', error);
	}
    
});

router.get('/new', ensureAdmin, ensureAuthenticated, function (req, res, next) {
	res.render('add-specie');
});

router.post('/new', ensureAdmin, ensureAuthenticated, function (req, res, next) {
    // Example of adding a new animal
    db.species.create({
        Name: req.body.name
    }).then(() => res.redirect('/species'))
      .catch(error => {
        console.error('Error adding specie:', error);
        res.status(500).send('Error adding specie');
    });
});

router.get('/:id', async (req, res, next) => {
	const specieId = req.params.id;

	const specie = await db.species.findAll({
		where: {
			id: [specieId]
		}
	})
	res.render('display-species', {data: specie});
});

router.get('/:id/edit', ensureAdmin, ensureAuthenticated, async (req, res, next) => {
	const specieId = req.params.id;

	const specie = await db.species.findAll({
		where: {
			id: [specieId]
		}
	})
	res.render('edit-specie', {data: specie});
});

router.post('/:id/edit', ensureAdmin, ensureAuthenticated, async (req, res, next) => {
	try {
		const { name } = req.body;

		await db.species.update(
			{
				Name: name
			},
			{ where: { id: req.params.id } }
		);

		res.redirect('/species');
	} catch (error) {
		console.error('Error editing item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
})

/**
 * Delete an animal
 */
router.get('/:id/delete', ensureAdmin, ensureAuthenticated, async (req, res, next) =>{
    await db.species.destroy({
		where:{
			Id: req.params.id,
		}
	});
	res.redirect('/species');
});

module.exports = router;