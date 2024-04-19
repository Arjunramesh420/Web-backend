const db = require("../models");
console.log("db",db);
const Contactus = db.contact;

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Contact
  const contactus = new Contactus({
    name: req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    queryTitle:req.body.queryTitle,
    query:req.body.query
  });

  // Save contact in the database
  contactus
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const contact = req.query.contact;
  var condition = contact ? { contact: { $regex: new RegExp(contact), $options: "i" } } : {};

  Contact.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contacts."
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
        });
      } else res.send({ message: "Contact was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contacts with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
    Contacts.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Contacts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts."
      });
    });
};

// Find all published Contacts
exports.findAllPublished = (req, res) => {
    Contacts.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};
