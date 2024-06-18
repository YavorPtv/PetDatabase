var express = require('express');
var router = express.Router();

const db = require('../models/index');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const ensureAdmin = require('../middleware/ensureAdmin');

router.get('/', async (req, res, next) => {
	try{
		const vetsList = await db.vets.findAll();
		res.render('display-vets', {data: vetsList});
	}
	catch(error){
		console.error('Error fetching data:', error);
	}
    
});

router.get('/new', ensureAdmin, ensureAuthenticated, function (req, res, next) {
	res.render('add-vet');
});

router.post('/new', ensureAdmin, ensureAuthenticated, function (req, res, next) {
	db.vets.create({
	  Name: req.body.name,
	  License: req.body.license,
	  Started: req.body.started,
	  Phone: req.body.phone
	})
	.then(() => res.status(201).send('Vet added successfully.'))
	.catch(error => {
	  if (error.name === 'SequelizeValidationError') {
		const messages = error.errors.map(err => err.message);
		return res.status(400).json({ message: messages.join(', ') });
	  }
	  console.error('Error adding vet:', error);
	  res.status(500).send({ message: 'Error adding vet.' });
	});
});

router.get('/:id', async (req, res, next) => {
	const vetId = req.params.id;

	const vet = await db.vets.findAll({
		where: {
			id: [vetId]
		}
	})
	res.render('display-vets', {data: vet});
});

router.get('/:id/edit', ensureAdmin, ensureAuthenticated, async (req, res, next) => {
	const vetId = req.params.id;

	const vet = await db.vets.findAll({
		where: {
			id: [vetId]
		}
	})
	res.render('edit-vet', {data: vet});
});

router.post('/:id/edit', ensureAdmin, ensureAuthenticated, async (req, res, next) => {
	try {
		const { name, license, started, phone } = req.body;

		await db.vets.update(
			{
				Name: name,
                License: license,
                Started: started,
                Phone: phone
			},
			{ where: { id: req.params.id } }
		);

		res.redirect('/vets');
	} catch (error) {
		if (error.name === 'SequelizeValidationError') {
			const messages = error.errors.map(err => err.message);
			return res.status(400).json({ message: messages.join(', ') });
		  }
		  console.error('Error editing vet:', error);
		  res.status(500).send({ message: 'Error editing vet.' });
	}
})

router.get('/:id/delete', ensureAdmin, ensureAuthenticated, async (req, res, next) =>{
    await db.vets.destroy({
		where:{
			Id: req.params.id,
		}
	});
	res.redirect('/vets');
});

module.exports = router;