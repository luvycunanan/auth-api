const bcrypt = require('bcryptjs');
const db = require('../models');

const create = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({status: 400, message: 'All fields required'});
  }

  try {
    const foundUser = await db.User.find({ email });
    if (foundUser) return res.status(400).json({status: 400, error: 'Account already exists. Please login'})
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userData = {
      username: username,
      email: email,
      password: hash
    }
    const newUser = await db.User.create(userData);
  }
  catch (err) {
    return res.status(500).json({status: 500, message: 'Something went wrong. Please try again'})
  }
}

const profile = async (req, res) => {
  try {
    const user = await db.User.findById(req.currentUserId);
    return res.json({status: 200, profile: user})
  }
  catch (err) {
    res.json({status: 500, error: 'Something went wrong. Please try again'})
  }
}


module.exports = {
  create,
  profile,
}