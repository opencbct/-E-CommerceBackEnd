const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const allTags = await Tag.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(allTags);
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).catch((err) => {
    res.status(500).json(err);
  });

  if (!tag) {
    res.status(404).json('no tag found!');
  } else {
    res.status(200).json(tag);
  }
});

router.post('/', async (req, res) => {
  if(req.body.tag_name.length){
    const newTag = await Tag.create(req.body).catch((err) => {
      res.status(400).json(err);
    });
    res.status(201).json(newTag);
  } else {
    res.status(404).json('no tag entered!');
  }
});

router.put('/:id', async (req, res) => {
  const tag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    res.status(500).json(err);
  });

  if (!tag) {
    res.status(404).json('no tag found!');
  } else {
    res.status(202).end();
  }
});

router.delete('/:id', async (req, res) => {
  const destroyedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).catch(err => {
    res.status(500).json(err);
  });

  if(!destroyedTag) {
    res.status(404).json('no tag found!');
  } else {
    res.status(202).json('tag deleted!');
  }
});

module.exports = router;
