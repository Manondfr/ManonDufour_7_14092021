const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if(!req.session.userId) {
      console.log('yeeees')
      //res.send('http://localhost:8080/#/login')
    } else {
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}

module.exports = (req, res, next) => {
  try {
    if(req.session.userId) {
      console.log(req.sessionID); 
    } else {
      console.log('no')
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
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


