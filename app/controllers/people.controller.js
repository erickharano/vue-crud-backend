const db = require('../models');
const People = db.peoples;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can't be empty."
    });
    return;
  }
  if (!req.body.birth) {
    res.status(400).send({
      message: "Birth can't be empty."
    });
    return;
  }

  const people = {
    name: req.body.name,
    birth: req.body.birth
  };

  People.create(people)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error while creating the People."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` }} : null;

  People.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error while search People"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  
  if (!id) {
    res.status(400).send({
      message: "ID can't be empty."
    });
    return;
  }

  People.findOne({
      where: { id: id }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error while search People"
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  People.update(req.body, {
      where: {id: id}
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "People was update successfully."
        });
      }
      else {
        res.send({
          message: `Can't update People with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error update People with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  People.destroy({
      where: {id: id}
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "People deleted successfully!"
        });
      }
      else {
        res.send({
          message: `Can't delete People with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete People with id=" + id
      });
    });
};