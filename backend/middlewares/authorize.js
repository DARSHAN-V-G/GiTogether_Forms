const supabase = require('../config/db_connect');
const bcrypt = require('bcrypt');
const authorize = async (req, res, next) => {
  const { name, password } = req.body;

  // Check for required fields
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    // Fetch the user from the 'user' table
    const { data: users, error } = await supabase
      .from('user')
      .select('password')
      .eq('name', name)
      .single(); // Use .single() to get one matching user

    // Handle potential errors or no user found
    if (error || !users) {
      return res.status(401).json({ message: 'Invalid name or password' });
    }

    const hashedPassword = users.password;

    // Compare provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid name or password' });
    }
    next();
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'An error occurred during login' });
  }
};

module.exports = { authorize };
