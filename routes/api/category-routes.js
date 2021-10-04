const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const allCategories = await Category.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(allCategories);
});

router.get('/:id', async (req, res) => {

  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).catch((err) => {
    res.status(500).json(err);
  });

  if (!category) {
    res.status(404).json('no category found!');
  } else {
    res.status(200).json(category);
  }
});

router.post('/', async (req, res) => {
  if(req.body.category_name.length){
    const newCategory = await Category.create(req.body).catch((err) => {
      res.status(400).json(err);
    });
    res.status(201).json(newCategory);
  } else {
    res.status(404).json('no category entered!');
  }

});

router.put('/:id', async (req, res) => {
  const category = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    res.status(500).json(err);
  });

  if (!category) {
    res.status(404).json('no category found!');
  } else {
    res.status(202).end();
  }
});

router.delete('/:id', async (req, res) => {
  const destroyedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  }).catch(err => {
    res.status(500).json(err);
  });

  if(!destroyedCategory) {
    res.status(404).json('no category found!');
  } else {
    res.status(202).json('category deleted!');
  }
});

module.exports = router;
