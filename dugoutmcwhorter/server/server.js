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
    function (accessToken, refreshToken, extraParams, profile, done) {
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

app.get("/api/msearch/:id", ic.msearch);
app.get("/api/ysearch/:id", ic.ysearch);

app.get("/api/mstockCheck/:id", ic.mstockCheck);
app.get("/api/ystockCheck/:id", ic.ystockCheck);
app.get("/api/pstockCheck/:id", ic.pstockCheck);

app.post("/api/cartadd/:card/:user", ic.cartadd);
app.post("/api/cartremove/:card/:user", ic.cartremove);

app.get("/api/checkCart/:user/:id", ic.checkCart);
app.get("/api/wishlist/:id", ic.wishlist)

app.post("/api/addmagic", ic.addmagic);
app.post("/api/addyugioh", ic.addyugioh);
app.post("/api/addproduct", ic.addproduct);

app.put("/api/inmagic", ic.inmagic);
app.put("/api/inyugioh", ic.inyugioh);
app.put("/api/inproduct", ic.inproduct);

app.put("/api/demagic", ic.demagic);
app.put("/api/deyugioh", ic.deyugioh);
app.put("/api/deproduct", ic.deproduct);

app.post("/api/cartincrease/:card/:user", ic.cartincrease);
app.post("/api/cartdecrease/:card/:user", ic.cartdecrease);

app.delete("/api/rproduct/:id", ic.rproduct);
app.delete("/api/rmagic/:id", ic.rmagic);
app.delete("/api/ryugioh/:id", ic.ryugioh);

const PORT = 3005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
