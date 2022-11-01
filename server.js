const path = require("path");
//Import express
const express = require("express");
//Import express session manager
const session = require("express-session");
//Import Handlebars view engine for express
const exphbs = require("express-handlebars");
//Import Sequelize config
const sequelize = require("./config/connection");
//Import SQL session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//Import server route controller
const routes = require("./controllers");
//Import Helper function for Views
const helpers = require("./utils/helper");

//Initializing Express app
const app = express();
//Specifing express server port
const PORT = process.env.PORT || 3001;

//Use Morgan to log request info
const morgan = require("morgan");

//Only logging error info
app.use(
  morgan("tiny", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

//Session Initialization
//Express-session config
const session_config = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000, //Cookie expired after an hour
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Add session middleware to requests
app.use(session(session_config));

//Initializing View Engine
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Decoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Static file middleware
app.use(express.static(path.join(__dirname, "public")));

//Router middleware
app.use(routes);

//Starting server through sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
});
