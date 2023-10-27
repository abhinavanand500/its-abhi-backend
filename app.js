const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
require('dotenv').config() // Load environment variables from .env file
const cors = require('cors') // Import the cors packa

const app = express()
app.use(cors())
const port = 3010

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.post('/send-email', (req, res) => {
  const beautifulString = JSON.stringify(req.body, null, 4)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Job Opportunity from your website',
    text: beautifulString.slice(1, -1)
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email', error, info)
      res.status(500).send({ message: 'Error sending email' })
    } else {
      console.log('Email sent: ' + info.response)
      res.status(200).send({ message: 'Email sent successfully' })
    }
  })
})