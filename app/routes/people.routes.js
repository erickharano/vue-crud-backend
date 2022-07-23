module.exports = app => {
    const peoples = require("../controllers/people.controller.js");

    var router = require("express").Router();

    // Create a new people
    router.post("/", peoples.create);

    // Retrieve all peoples
    router.get("/", peoples.findAll);

    // Retrieve a single people with id
    router.get("/:id", peoples.findOne);

    // Update a people with id
    router.put("/:id", peoples.update);

    // Delete a people with id
    router.delete("/:id", peoples.delete);

    app.use('/api/peoples', router);
}; 