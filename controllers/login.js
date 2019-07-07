const formidable = require('formidable');
const db = require('../database/db.js');

module.exports.get = function (req, res) {
  res.render('pages/login', {
    title: 'Login'
  })
}

module.exports.post = function (req, res) {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    const users = {
      email: req.body.email,
      password: req.body.password
    };

    db.get('users').push(users).write();
    return res.redirect('/admin')

  }
  res.redirect('/?msglogin=Неправильный логин или пароль');

}