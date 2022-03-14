const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories

  Category.findAll({
    // be sure to include its associated Products
    include: [
      {model: Product}
    ]

  }).then((categories) => {
    res.json(categories);
  })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  
  Category.findByPk(req.params.id, {
    include: [
      {model: Product}
    ]

  }).then((category) => res.json (category))
  // be sure to include its associated Products
});

// create a new category
router.post('/', (req, res) => {
  
  Category.create({
    category_name: req.body.category_name,
  }).then((newCategory) => {
    res.json(newCategory);
  })
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  }, {
    where: {
      id:req.params.id
    }
  }).then((updated) => {
    res.json(updated);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  }).then((deleted) => {
    res.json(deleted);
  })
});

module.exports = router;