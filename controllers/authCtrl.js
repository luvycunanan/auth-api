const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json('All fields required');
  
  try  {
    const user = await db.User.findOne({ email });
    if (!user) return res.json('Your email or password does not match our records, please try again')

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json('Your email or password does not match our records, please try again')
    
    // Create jwt token with userId
    const payload = { userId: user._id};
    const secret = process.env.JWT_SECRET;
    const exp = { expiresIn: '30d' };

    // Sign jwt
    const token = await jwt.sign(payload, secret, exp);
    res.json({status: 200, token});
  }
  catch (err) {
    return res.json({status: 500, message: 'Something went wrong. Please try again'})
  }
}

const verify = async (req, res) => {
  res.json({status: 200, userId: req.currentUserId})
}

module.exports = {
  login,
  verify,
}