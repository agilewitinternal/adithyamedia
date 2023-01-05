const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const contactEmail = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // use SSL

  auth: {
    user: "reachus@adithyamedia.com",
    pass: "Media#143",
  },
});
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const contact = req.body.contact;

  const mail = {
    from: `${firstName} ${lastName}`,
    to: "reachus@adithyamedia.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${firstName} ${lastName}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

app.listen(5000, () => console.log("Server Running"));
