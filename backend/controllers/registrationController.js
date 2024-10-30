const supabase = require('../config/db_connect');

const postData = async (req, res) => {
  // Extract data from the request body
  const { name, roll_no, department, email, phn_no } = req.body;

  // Define data structure with the current timestamp for created_at
  const data = {
    name,
    roll_no,
    department,
    email,
    phn_no,
    created_at: new Date().toISOString() // Automatically set to current timestamp
  };

  try {
    // Insert data into the gitogether table
    const { data: insertedData, error } = await supabase
      .from('gitogether') // Make sure your table name matches exactly
      .insert([data]);

    if (error) {
      console.error("Error inserting data:", error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.log("Data inserted successfully:", insertedData);
      res.status(201).json({ message: 'Data inserted successfully', data: insertedData });
    }
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

module.exports = {
  postData
}
