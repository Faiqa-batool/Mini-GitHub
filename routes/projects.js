const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Mini-Github", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const projectSchema = mongoose.Schema({
  ProjectTitle: String,
  DeveloperName: String,
  Description: String,
  HostedURL: String
});



module.exports = mongoose.model("project", projectSchema);
