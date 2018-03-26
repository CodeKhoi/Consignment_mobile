// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/all", function(req, res) {   
    db.Consignment.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // Get a specific substrate
  app.get("/api/:consignment", function(req, res) {
    db.Consignment.findAll({
      where: {
        item_description: req.params.consignment
      }
    })
    .then(function(dbConsignment) {
    res.json(dbConsignment);
    });
  });

  // Add a substrate
  app.post("/api/new", function(req, res) {
    console.log("Consignment Data:");
    console.log(req.body);
    db.Consignment.create({
      item_description: req.body.item_description,
      item_qty: req.body.item_qty,
      consignment_received: req.body.consignment_received
    });
  });

  //Enter/update inventory
  app.post("/api/enter", function(req, res) {
    console.log("Consignment Data:");
    console.log(req.body);
    db.Consignment.update({
      item_qty: req.body.item_qty,
      consignment_received: req.body.consignment_received
    }, {
      where: {
        item_description: req.body.item_description 
      }
    }).then(function(dbConsignment) {
      res.json(dbConsignment);
    });
  }); 
 
  //Remove/update inventory
  app.post("/api/remove", function(req, res) {
    console.log("Consignment Data:");
    console.log(req.body);
    db.Consignment.update({
      item_qty: req.body.item_qty
    }, {
      where: {
        item_description: req.body.item_description 
      }
    }).then(function(dbConsignment) {
      res.json(dbConsignment);
    });
  });  

  //Deduct/update inventory
  app.post("/api/deduct", function(req, res) {
    console.log("Consignment Data:");
    console.log(req.body);
    db.Consignment.update({
      consignment_received: req.body.consignment_received
    }, {
      where: {
        item_description: req.body.item_description 
      }
    }).then(function(dbConsignment) {
      res.json(dbConsignment);
    });
  });

}; //Module Export



