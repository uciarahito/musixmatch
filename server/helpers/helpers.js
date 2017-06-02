const bCrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
let methods = {}

methods.check_token = (req, res, next) => {
  let token = req.headers.token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded) {
      req.body.role = decoded.role
      next()
    } else {
      res.json({err})
    }
  })
}

methods.dueDate = (days) => {
  let nowDate = new Date()
  let convertNowDate = Number(new Date(nowDate))
  let convertDays = Number((days*1000*60*60*24))
  console.log('Now: '+convertNowDate);
  console.log('Days: '+convertDays);
  return new Date(convertNowDate + convertDays)
}

module.exports = methods