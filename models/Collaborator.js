let thinky = require(__dirname+'/db/thinky.js');
let type = thinky.type;

let Collaborator = thinky.createModel("Collaborator", {
  id: type.string(),
  name: type.string()
});
