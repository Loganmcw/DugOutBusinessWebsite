require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  cors = require("cors"),
  ic = require(__dirname + "/controllers");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      console.log(profile.nickname);
      db.find_user([profile.emails[0].value]).then(user => {
        console.log(user[0]);
        if (user[0]) {
          return done(null, user[0].user_id);
        } else {
          const user = profile._json;
          db.create_user([user.email, user.name]).then(user => {
            return done(null, user[0].user_id);
          });
        }
      });
    }
  )
);

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "/auth"
  })
);

app.get("/auth/me", (req, res) => {
  if (!req.user) {
    return res.status(404).send("User Not Found");
  } else {
    return res.status(200).send(req.user);
  }
});

app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect(302, "http://localhost:3000/#/");
});

passport.serializeUser((user_id, done) => {
  done(null, user_id);
});
passport.deserializeUser((user_id, done) => {
  app
    .get("db")
    .find_current_user([user_id])
    .then(user => {
      done(null, user[0]);
    });
});

const baseUrl = "/api";

app.post("/api/search", ic.search);

app.post("/api/currentProducts", ic.cP);

app.post("/api/filter", ic.filter);
app.post("/api/sfilter", ic.sfilter);

app.post("/api/msearch", ic.msearch);
app.post("/api/ysearch", ic.ysearch);

app.get("/api/mstockCheck", ic.mstockCheck);
// app.get("/api/ystockCheck", ic.ystockCheck);
// app.get("/api/pstockCheck", ic.pstockCheck);

// app.post("/api/cartcard", ic.cartcard);
// app.post("/api/cartproduct", ic.cartproduct);

// app.delete("/api/dcartcard", ic.dcartcard);
// app.delete("/api/dcartproduct", ic.dcartproduct);

app.post("/api/addmagic", ic.addmagic);
app.post("/api/addyugioh", ic.addyugioh);
app.post("/api/addproduct", ic.addproduct);

app.put("/api/incard", ic.inproduct);
app.put("/api/decard", ic.deproduct);

app.post("/api/rproduct", ic.rproduct);

const PORT = 3005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
