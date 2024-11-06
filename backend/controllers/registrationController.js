const supabase = require('../config/db_connect');
const { Resend } = require('resend');
require('dotenv').config();

const emailhandler = new Resend(process.env.RESEND_API)

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
  const mailOptions = {
    from: process.env.EMAIL_ID, // Sender's email
    to: recipientEmail, // Recipient's email
    subject: 'GiTogether Registration Confirmation', // Subject line
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>GiTogether Registration Confirmation</title>
    <style>
      body {
        font-family: Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 16px;
        line-height: 1.3;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        background-color: #f4f5f6;
        margin: 0;
        padding: 0;
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%;
      }

      table td {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        vertical-align: top;
      }
      /* -------------------------------------
      BODY & CONTAINER
      ------------------------------------- */

      .body {
        background-color: #f4f5f6;
        width: 100%;
        text-align: center; /* Center email content */
      }

      .container {
        margin: 0 auto !important;
        max-width: 600px;
        padding: 0;
        padding-top: 24px;
        width: 600px;
      }

      .content {
        box-sizing: border-box;
        display: inline-block; /* Change to inline-block for centering */
        max-width: 600px;
        padding: 0;
      }
      /* -------------------------------------
      HEADER, FOOTER, MAIN
      ------------------------------------- */

      .main {
        background: #ffffff;
        border: 1px solid #eaebed;
        border-radius: 16px;
        width: 100%;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 24px;
      }

      .footer {
        clear: both;
        padding-top: 24px;
        text-align: center;
        width: 100%;
      }

      .footer td,
      .footer p,
      .footer span,
      .footer a {
        color: #9a9ea6;
        font-size: 16px;
        text-align: center;
      }
      /* -------------------------------------
      TYPOGRAPHY
      ------------------------------------- */

      p {
        font-family: Helvetica, sans-serif;
        font-size: 16px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 16px;
      }

      a {
        color: #0867ec;
        text-decoration: underline;
      }
      /* -------------------------------------
      BUTTONS
      ------------------------------------- */

      .btn {
        box-sizing: border-box;
        min-width: 100% !important;
        width: 100%;
      }

      .btn > tbody > tr > td {
        padding-bottom: 16px;
      }

      .btn table {
        width: auto;
      }

      .btn table td {
        background-color: #ffffff;
        border-radius: 4px;
        text-align: center;
      }

      .btn a {
        background-color: #ffffff;
        border: solid 2px #0867ec;
        border-radius: 4px;
        box-sizing: border-box;
        color: #0867ec;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        padding: 12px 24px;
        text-decoration: none;
        text-transform: capitalize;
      }

      .btn-primary table td {
        background-color: #0867ec;
      }

      .btn-primary a {
        background-color: #0867ec;
        border-color: #0867ec;
        color: #ffffff;
      }

      @media all {
        .btn-primary table td:hover {
          background-color: #ec0867 !important;
        }
        .btn-primary a:hover {
          background-color: #ec0867 !important;
          border-color: #ec0867 !important;
        }
      }

      /* -------------------------------------
      OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */

      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .text-link {
        color: #0867ec !important;
        text-decoration: underline !important;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      /* -------------------------------------
      RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */

      @media only screen and (max-width: 640px) {
        .main p,
        .main td,
        .main span {
          font-size: 16px !important;
        }
        .wrapper {
          padding: 8px !important;
        }
        .content {
          padding: 0 !important;
        }
        .container {
          padding: 0 !important;
          padding-top: 8px !important;
          width: 100% !important;
        }
        .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
        .btn table {
          max-width: 100% !important;
          width: 100% !important;
        }
        .btn a {
          font-size: 16px !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      }
      /* -------------------------------------
      PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */

      @media all {
        .ExternalClass {
          width: 100%;
        }
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" align="center">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <p>Hey 👋</p>
                  <p>Thank you for registering for <b>GitTogether</b>! We at GitHub Campus Club are super pumped to have you for our premier event.</p>
                  <p>GiTogether brings a fun mix of challenges! Starting with the GitHub Speed Run for quick navigation skills, then Box of Lies where teams bluff and guess quirky items, and ending with Marketing Silly Things where teams pitch funny, unconventional items. Each round promises creativity, teamwork, and lots of laughs!</p>
                  <p><b>Event Details:</b></p>
                  <p>&nbsp;&nbsp;&nbsp;<b>Event Date:</b> 14th November 2024</p>
                  <p>&nbsp;&nbsp;&nbsp;<b>Event Time:</b> 3:45 p.m - 6 p.m IST</p>
                  <p>&nbsp;&nbsp;&nbsp;<b>Venue:</b> 3AI Lab and SCPSC Lab, E-Block 3rd Floor</p>
                  <p><b>Please add a reminder to Google Calendar</b></p>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                    <tbody>
                      <tr>
                        <td align="center">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=GitTogether&dates=20241114T101500Z/20241114T123000Z&details=Join%20us%20for%20the%20GitTogether%20event!&sf=true&output=xml" target="_blank">Add to Calendar</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p><b>Please join us on WhatsApp using the below link :)</b></p>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                    <tbody>
                      <tr>
                        <td align="center">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <a href="https://chat.whatsapp.com/LEaZbPgq5DB8EkYXjXMUK6" target="_blank">Join us on WhatsApp!</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>Please watch out for event-related updates on both channels (email and WhatsApp), that's the only way we can reach you.</p>
                  <p>See y'all there!</p>
                  <p><b>Github Campus Club - PSGCT</b></p>
                  <br>
                  <!-- Add to Calendar Button -->
                </td>
              </tr>
              <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->
            <div class="footer">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-block">
                    <span class="apple-link">GitHub Campus Club, (under CSEA)</span>
                    <br> Don't like these emails? <a href="https://link.akashshanmugaraj.com/link/unsub">Unsubscribe</a>.
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by">
                    Powered by <a href="http://htmlemail.io">HTMLemail.io</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>`
  };

  // Send the email using Resend
  try {
    await emailhandler.emails.send(mailOptions);
    console.log(`Confirmation email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
  }
};



module.exports = {
  postData
}