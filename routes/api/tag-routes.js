const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags

    Tag.findAll({
      // be sure to include its associated Product data

      include: [ 
        {model: Product}
      ]
  }).then((tags) => {
    res.json(tags);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`

  Tag.findOne({
    where: {
      id: req.params.id,
    },
    
    // be sure to include its associated Product data
    include: {
      model: Product,
    },  
  
    }).then ((tag) => {
      res.json(tag)
    });
});


router.post('/', (req, res) => {
  // create a new tag

  Tag.create({
    tag_name: req.body.tag_name,
  }).then((newTag) => {
    res.json(newTag);
  });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update({
    tag_name: req.body.tag_name
  }, {
    where: {
      id: req.params.id
    }
  }).then((updatedTag) => {
    res.json(updatedTag);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      id: req.params.id,
    }
  }).then((deletedTag) => {
    res.json(deletedTag);
  });
});

module.exports = router;
