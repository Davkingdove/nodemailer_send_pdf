const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

const port = 3000;
// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Specify your SMTP server
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'didinfomessages@gmail.com', // Specify your email credentials
    pass: 'jhrw rqxt mkdz ogbv'
  }
});

// Express route for handling file upload and sending email
app.post('/send-pdf', upload.single('pdf'), (req, res) => {
  const { email } = req.body;
  const pdfFilePath = req.file.path;

  const mailOptions = {
    from: 'didinfomessages@gmail.com',
    to: email,
    subject: 'PDF File',
    text: 'Please find the attached PDF file.',
    attachments: [
      {
        filename: path.basename(pdfFilePath),
        path: pdfFilePath
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















































// // Multer configuration for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // e.g., 'gmail'
//   auth: {
//     user: 'asaredavid777@gmail.com',
//     pass: 'majadaja'
//   }
// });

// // Express route for handling file upload and sending email
// app.post('/send-pdf', upload.single('pdf'), (req, res) => {
//   const { email } = req.body;
//   const pdfFilePath = req.file.path;

//   const mailOptions = {
//     from: 'philipkmensah70@gmail.com',
//     to: email,
//     subject: 'PDF File',
//     text: 'Please find the attached PDF file.',
//     attachments: [
//       {
//         filename: path.basename(pdfFilePath),
//         path: pdfFilePath
//       }
//     ]
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).send('Email sent successfully');
//     }
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
