var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

const { cats, dogs } = require('../models').sequelize.models;

router.get('/home', function (req, res, next) {
	res.render('home');
});

router.get('/pets/new', function (req, res, next) {
	res.render('new-pet');
});

router.get('/pets/dogs/show-all', async (req, res, next) => {
	try {
		const allDogs = await dogs.findAll();
		console.log('Data from dogs table:', allDogs);
		res.render('display-table-dog', { data: allDogs });
	} catch (error) {
		console.error('Error interacting with the database:', error);
		res.status(500).send('Error interacting with the database');
	}
});

router.get('/pets/cats/show-all', async (req, res, next) => {
	try {
		const allCats = await cats.findAll();
		console.log('Data from cats table:', allCats);
		res.render('display-table-cat', { data: allCats });
	} catch (error) {
		console.error('Error interacting with the database:', error);
		res.status(500).send('Error interacting with the database');
	}
});

router.post('/pets/new', async (req, res, next) => {
	const petType = req.body.type;

	try {
		if (petType === 'cat') {
			// Using Sequelize to add a new cat
			const newCat = await cats.create({
				Name: req.body.catName,
				Age: req.body.catAge,
				Colour: req.body.catColour,
			});

			console.log('New cat added successfully:', newCat.Id);

			res.redirect('/pets/cats/show-all');
		} else if (petType === 'dog') {
			// Using Sequelize to add a new dog
			const newDog = await dogs.create({
				Name: req.body.dogName,
				Breed: req.body.dogBreed,
				Age: req.body.dogAge,
				Friendliness: req.body.dogFriendliness,
			});

			console.log('New dog added successfully:', newDog.Id);

			res.redirect('/pets/dogs/show-all');
		}
	} catch (error) {
		console.error('Error interacting with the database:', error);
		res.status(500).send('Error interacting with the database');
	}
});

router.get('/delete-dog/:id', async (req, res) => {
	try {
		// Find the item by its ID
		const itemId = req.params.id;
		const item = await dogs.findByPk(itemId);

		// If item not found, return 404
		if (!item) {
			return res.status(404).json({ error: 'Item not found' });
		}

		// Delete the item
		await item.destroy();
		res.redirect('/pets/dogs/show-all');
	} catch (error) {
		// If an error occurs, send a 500 response
		console.error('Error deleting item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/delete-cat/:id', async (req, res) => {
	try {
		// Find the item by its ID
		const itemId = req.params.id;
		const item = await cats.findByPk(itemId);

		// If item not found, return 404
		if (!item) {
			return res.status(404).json({ error: 'Item not found' });
		}

		// Delete the item
		await item.destroy();
		res.redirect('/pets/cats/show-all');
	} catch (error) {
		// If an error occurs, send a 500 response
		console.error('Error deleting item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/edit-dog/:id', async (req, res) => {
	const dog = await dogs.findByPk(req.params.id);
	console.log(dog);
	res.render('edit-dog', { dog: dog });
});

router.get('/edit-cat/:id', async (req, res) => {
	const cat = await cats.findByPk(req.params.id);
	console.log(cat);
	res.render('edit-cat', { cat: cat });
});

router.post('/edit-dog/:id', async (req, res) => {
	try {
		const { dogName, dogBreed, dogAge, dogFriendliness } = req.body;

		await dogs.update(
			{
				Name: dogName,
				Breed: dogBreed,
				Age: dogAge,
				Friendliness: dogFriendliness,
			},
			{ where: { id: req.params.id } }
		);

		res.redirect('/pets/dogs/show-all');
	} catch (error) {
		// If an error occurs, send a 500 response
		console.error('Error deleting item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/edit-cat/:id', async (req, res) => {
	try {
		const { catName, catAge, catColour } = req.body;

		await cats.update(
			{
				Name: catName,
				Age: catAge,
				Colour: catColour,
			},
			{ where: { id: req.params.id } }
		);

		res.redirect('/pets/cats/show-all');
	} catch (error) {
		// If an error occurs, send a 500 response
		console.error('Error deleting item:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
