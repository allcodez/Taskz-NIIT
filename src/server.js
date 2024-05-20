// server.js
import express from 'express';
import { createTransport } from 'nodemailer';
import { json } from 'body-parser';

const app = express();
const port = 5000;

app.use(json());

// Email configuration
const transporter = createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'startasks991@gmail.com', // Your email address
        pass: 'Star991.' // Your email password or app-specific password
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    const mailOptions = {
        from: 'startasks991@gmail.com',
        to: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error
            res.status(500).send('Error sending email: ' + error.message); // Send error message to client
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
