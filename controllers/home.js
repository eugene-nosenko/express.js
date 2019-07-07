const db = require('../database/db.js');

module.exports.get = function (req, res) {
  var data = {
    skills: db.get('skills').value(),
    products: db.get('products').value(),
    msgsemail: req.query.msgsemail
  };
  // console.log(data);


  res.render('pages/index', data)
}

module.exports.post = function (req, res) {

  if (req.body.name && req.body.email && req.body.message) {
    db.get('messages').push(req.body).write();
    return res.redirect('/?msgsemail=Сообщение отправлено')
  }
  res.redirect('/?msgsemail=Заполните все поля')
  // console.log(req.body);

}