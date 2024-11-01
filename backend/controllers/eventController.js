const supabase = require('../config/db_connect');

const getEventData = async (req, res) => {
  try {
    const { data, error } = await supabase.from('gitogether').select('*');

    if (error) {
      return res.status(500).json({ message: 'Error fetching event data' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching event data:', err.message);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

module.exports = { getEventData };
