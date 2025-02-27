
var express = require("express");
var router = express.Router();
const userModel = require("./users");
const projectModel = require("./projects");
const passport = require("passport");
const bodyParser = require('body-parser');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public')); // Assuming your static files are in the 'public' directory

router.get("/", function(req, res){
  res.render("index", {foooter: false})
});

router.get("/register", function (req, res) {
  res.render("Register", { footer: false });

});

router.get("/login", function (req, res) {
  res.render("login", { footer: false });
});

router.get("/MainPage",isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render("MainPage", { footer: true, user});
});

router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email
  });

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/MainPage?message=AccountCreated");
      
    });
  });
});

router.post("/MainPage", async function(req, res, next) {
  try {
      // Create a new project document with data from the form
      const projectData = new projectModel({
          ProjectTitle: req.body.ProjectTitle,
          DeveloperName: req.body.DeveloperName,
          Description: req.body.Description,
          HostedURL: req.body.HostedURL
      });
      const savedProjectData = await projectData.save();
      console.log('result= ', savedProjectData);
      res.send('Your data saved successfully!');
  } catch (err) {
      console.log('Error in saving data:', err);
      res.status(500).send('Error in saving your data');
  }
});
router.get('/MainPage', async (req, res) => {
  try {
      const projects = await projectModel.find(); // Fetch data from MongoDB
      res.render('Mainpage', { projects });
  } catch (err) {
      res.status(500).send(err);
  }
});

router.post("/login",passport.authenticate("local",{
  successRedirect: "/MainPage",
  failureRedirect: "/login"
}) , function (req, res) {
});

router.post("/logout", function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login")
}


module.exports = router;
