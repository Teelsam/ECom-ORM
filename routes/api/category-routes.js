const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCat = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    })
    res.status(200).json(allCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCat = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });
    if (!oneCat) {
      res.status(404).json({ message: 'No matching Category' });
      return;
    }
    res.status(200).json(oneCat);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({ category_name: req.body.category_name });
    if (!newCat) {
      res.status(404).json({ message: 'New Category not created' });
      return;
    }
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCat[0]) {
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteCat) {
      res.status(404).json({ message: 'no category with that id' });
      return;
    }
    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
