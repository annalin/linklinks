let thinky = require('../db/thinky.js');
let type = thinky.type;
let r = thinky.r;

// Create a model - the table is automatically created
let Link = thinky.createModel("Link", {
  id: type.string(),
  content: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
  // idCollaborator: type.string()
});

// Join the models
// Post.belongsTo(Collaborator, "collaborator", "idCollaborator", "id");

module.exports = Link;
