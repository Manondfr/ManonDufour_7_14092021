module.exports = (req, res, next) => {
  try {
    if(!req.session.userId) {
      res.send('http://localhost:8080/#/login')
    } else {
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}