var express = require('express');
var router = express.Router();

const db = require('../models/index');


router.get('/', async (req, res, next) => {
	try{
		const ownersList = await db.owners.findAll();
		res.render('display-owners', {data: ownersList});
	}
	catch(error){
		console.error('Error fetching data:', error);
	}
    
});

router.get('/new', function (req, res, next) {
	res.render('add-owner');
});

router.post('/new', function (req, res, next) {
    // Example of adding a new animal
    db.owners.create({
        Name: req.body.name,
        Age: req.body.age,
        City: req.body.city
    }).then(() => res.redirect('/owners'))
      .catch(error => {
        console.error('Error adding owner:', error);
        res.status(500).send('Error adding owner');
    });
});

router.get('/:id', async (req, res, next) => {
	const ownerId = req.params.id;

	const owner = await db.owners.findAll({
		where: {
			id: [ownerId]
		}
	})
	res.render('display-owners', {data: owner});
});

router.get('/:id/edit', async (req, res, next) => {
	const ownerId = req.params.id;

	const owner = await db.owners.findAll({
		where: {
			id: [ownerId]
		}
	})
	res.render('edit-owner', {data: owner});
});

router.post('/:id/edit', async (req, res, next) => {
	try {
		const { name, age, city } = req.body;

		await db.owners.update(
			{
				Name: name,
				Age: age,
				City: city
			},
			{ where: { id: req.params.id } }
		);

		res.redirect('/owners');
	} catch (error) {
		console.error('Error editing item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
})

/**
 * Delete an animal
 */
router.get('/:id/delete', async (req, res, next) =>{
    await db.owners.destroy({
		where:{
			Id: req.params.id,
		}
	});
	res.redirect('/owners');
});

module.exports = router;