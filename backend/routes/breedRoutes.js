const express = require('express');
const {
  getAllBreeds,
  getBreedById,
  createBreed,
  seedBreeds
} = require('../controllers/breedController');

const router = express.Router();

router.get('/', getAllBreeds);
router.get('/:id', getBreedById);
router.post('/', createBreed);
router.post('/seed', seedBreeds);

module.exports = router;
