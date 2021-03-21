const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.json({status: 400, error: 'Error, Please log in'})

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.currentUserId = decodedToken.userId;
    next();
  }
  catch (err) {
    res.json({status: 500, error: 'Something went wrong. Please try again'});
  }
}

module.exports = auth;