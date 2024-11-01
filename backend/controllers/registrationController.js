const supabase = require('../config/db_connect');
const nodemailer = require('nodemailer');
require('dotenv').config();
const postData = async (req, res) => {
  const { name, roll_no, department, email, phn_no, year } = req.body;

  const data = {
    name,
    roll_no,
    department,
    email,
    phn_no,
    year,
    created_at: new Date().toISOString() 
  };

  try {
   
    const { data: insertedData, error } = await supabase
      .from('gitogether')
      .insert([data]);

    if (error) {
      console.error("Error inserting data:", error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.log("Data inserted successfully:", insertedData);
      res.status(201).json({ message: 'Data inserted successfully', data: insertedData });
      await sendConfirmationEmail(email);
    }
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

// Function to send a confirmation email
const sendConfirmationEmail = async (recipientEmail) => {
  // Create transporter with your email service configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: `${process.env.EMAIL_ID}`, // Replace with your email
      pass: `${process.env.EMAIL_PASSWORD}` // Use an app-specific password if using Gmail
    }
  });

  // Define email options
  const mailOptions = {
    from: `${process.env.EMAIL_ID}`, // Sender's email
    to: recipientEmail, // Recipient's email
    subject: 'Registration successful : GiTogether',
    text: 'Thank you for registering for GiTogether. Meet you on 14th Nov at 3:40pm.'
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
  }
};


module.exports = {
  postData
}
