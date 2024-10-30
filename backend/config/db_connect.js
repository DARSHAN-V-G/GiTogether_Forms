const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
let supabase;
try {
  // Initialize the Supabase client with environment variables
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log("Connected to Supabase");
} catch (err) {
  // Log the error if there’s an issue
  console.error("Error connecting to Supabase:", err);
}

// Export the supabase client
module.exports = supabase;
