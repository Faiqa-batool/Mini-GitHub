const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Mini-Github", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
  username: String,
  name: String, 
  email: String,
  password: String, 
});

userSchema.plugin(plm);


module.exports = mongoose.model("user", userSchema);
