//importing modules\

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const app = express();
// const session = require("express-session");
// const passport = require("passport");
// const passpoerLocalMongoose = require("passport-local-mongoose");
// const findorCreate = require("mongoose-findorcreate");
const shortId = require("short-unique-id");
var QRCode = require("qrcode");

//Requiring login Modules
// const fs = require("fs");

//razorpay
const Razorpay = require("razorpay");

//intermediaries
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Intermediaries Login
mongoose.set("strictQuery", true);
app.use(
  cors({
    credentials: true,
    origin: process.env.WEBSITE_URL,
    // origin: "http://localhost:5500",
  })
);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.set("strictQuery", true);
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect(
  "mongodb+srv://rcaiitkgppayments:P1arIVjFWGfYKS3H@clusterrca.4f9m5ke.mongodb.net/RCA",
  { useNewUrlParser: true }
);

// const userSchemaAdmin = new mongoose.Schema({
//   username: String,
//   password: String,
// });
// userSchemaAdmin.plugin(passpoerLocalMongoose);
// userSchemaAdmin.plugin(findorCreate);

// const UserAdmin = mongoose.model("UserAdmin", userSchemaAdmin);
// passport.use(UserAdmin.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   UserAdmin.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  rollNumber: String,
  hall: String,
  roomNumber: String,
  id: String,
  status: Boolean,
  coupons: Number,
  coupons_used: Number,
  token: String,
  short_url: String,
});
const User = mongoose.model("User", userSchema);
app.get("/",function(req,res){
    res.send("I am On");
});
app.post("/razorpay", async function (req, res) {
  console.log("IN");
  const uid = new shortId();
  const token = uid.stamp(32);
  let cost = process.env.COUPON_PRICE * req.body.number_of_coupons;
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  instance.paymentLink
    .create({
      amount: cost * 100,
      currency: "INR",
      description: req.body.description,
      customer: {
        name: req.body.name,
        email: req.body.email,
      },
      notes: {
        contact: req.body.contact,
        number_of_coupons: req.body.number_of_coupons,
        roll_number: req.body.rollNumber,
        hall: req.body.hall,
        roomNumber: req.body.room,
        token: token,
      },
      // notify: {
      //   email: true,
      // },
      options: {
        prefill: {
          contact: req.body.contact,
          email: req.body.email,
        },
      },
      callback_url: process.env.SELF_URL + "/success/razorpay?token=" + token,
      callback_method: "get",
    })
    .then((response) => {
      const user = new User({
        token: token,
        email: req.body.email,
        id: response.id,
        status: false,
        coupons: req.body.number_of_coupons,
        roll_number: req.body.rollNumber,
        hall: req.body.hall,
        roomNumber: req.body.room,
        coupons_used: 0,
        token: token,
        short_url: response.short_url,
      });
      user.save();
      console.log("Updated!!");
      res.redirect("/mail2/" + token + "?email=" + req.body.email);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/verify/:token", async function (req, res) {
  const found = await User.find({ token: req.params.token }).exec();
  console.log(found);
  if (found.length != 0) {
    res.redirect(found[0].short_url);
  } else {
    res.redirect(process.env.WEBSITE_URL + "/succesful");
  }
});

app.get("/success/razorpay", async function (req, res) {
  const token = req.query.token;
  const docs = await User.findOneAndUpdate(
    { token: token },
    { status: true },
    {
      new: true,
    }
  );
  const email = docs.email;
  res.redirect("/mail?email=" + email + "&id=" + docs.id);
});

//Sending mails using nodemailer
app.get("/mail2/:token", function (req, res) {
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAILID,
      pass: process.env.GMAILAPPPASSWORD,
    },
    from: process.env.GMAILID,
  });
  const mailOptions = {
    from: process.env.GMAILID,
    to: req.query.email,
    subject: "Team, RCA IITKGP",
    text: "Please verify your email!!",
    html:
      '<a href="' +
      process.env.SELF_URL +
      "/verify/" +
      req.params.token +
      '">' +
      process.env.SELF_URL +
      "/verify/" +
      req.params.token +
      "</a>",
  };

  Transporter.sendMail(mailOptions)
    .then((response) => {
      res.redirect(process.env.WEBSITE_URL + "/succesful");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/mail", async function (req, res) {
  console.log(req.query.id);
  const id = req.query.id;
  let img = await QRCode.toDataURL(id);

  const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAILID,
      pass: process.env.GMAILAPPPASSWORD,
    },
    from: process.env.GMAILID,
  });
  let mailOptions = {
    from: process.env.GMAILID, // sender address
    to: req.query.email, // list of receivers
    subject: "Team, RCA IITKGP", // Subject line
    text: "Payment Successful", // plain text body
    attachDataUrls: true,
    html: 'Please find the QR code Below </br> <img src="' + img + '">', // html body
    attachments:[
        {
            path: img
        }
    ]
  };

  Transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    //console.log('Message %s sent: %s', info.messageId, info.response);
    res.redirect(process.env.WEBSITE_URL + "/succesful");
  });
});
//Admin Part

app.get("/check/:paymentLink/:password", async function (req, res) {
  if (req.params.password === "test") {
    //Check for correct coupon
    const found = await User.find({ id: req.params.paymentLink }).exec();
    console.log(found);
    if (found.length != 0) {
      if (
        found[0].status === true &&
        found[0].coupons_used < found[0].coupons
      ) {
        const docs = await User.findOneAndUpdate(
          { id: req.params.paymentLink },
          { coupons_used: found[0].coupons_used + 1 },
          {
            new: true,
          }
        );
        console.log(docs);
        res.redirect(process.env.WEBSITE_URL + "/congrats");
      } else {
        res.redirect(process.env.WEBSITE_URL + "/failed");
      }
    } else {
      //Check here for correct id
      res.redirect(process.env.WEBSITE_URL + "/failed");
    }
  } else {
    res.redirect(process.env.WEBSITE_URL + "/failed");
  }
});

// app.get("/register", function (req, res) {
//   res.redirect(process.env.WEBSITE_URL + "/register");
// });

// app.get("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect(process.env.WEBSITE_URL);
//   });
// });
// app.get("/login/:paymentLink", function (req, res) {
//   res.redirect(process.env.WEBSITE_URL + "/login");
// });

// app.post("/register", function (req, res) {
//   UserAdmin.register(
//     { username: req.body.username },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         console.log(err);
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect(process.env.WEBSITE_URL + "/register");
//         });
//       }
//     }
//   );
// });

// app.post("/login/:paymentLink", function (req, res) {
//   const user = new UserAdmin({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   req.login(user, function (err) {
//     if (err) {
//       console.login(err);
//     } else {
//       passport.authenticate("local");
//       res.redirect(process.env.WEBSITE_URL + "/" + req.params.paymentLink);
//     }
//   });
// });

//listening on port
const PORT = 8282 || process.env.PORT;
app.listen(PORT, function () {
  console.log("server is running at port " + PORT);
});
