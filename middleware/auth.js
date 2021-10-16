const RAN_TOKEN = process.env.RAN_TOKEN;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if(!req.session.accessToken) {
      return res.status(401).json({ message: 'Missing token in cookie' });
    }
    if (!req.headers || !req.headers['x-xsrf-token']) {
      return res.status(401).json({ message: 'Missing XSRF token in headers' });
    }
    const xsrfToken = req.headers['x-xsrf-token'];
    const decodedToken = jwt.verify(req.session.accessToken, RAN_TOKEN);
    if (xsrfToken !== decodedToken.xsrfToken) {
      return res.status(401).json({ message: 'Bad xsrf token' });
    }
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
