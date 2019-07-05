module.exports.get = function (req, res) {
  res.render('pages/login', {
    title: 'Login'
  })
}

module.exports.post = function (req, res) {
  console.log(req.body);
  // if (req.body.name && req.body.email && req.body.message) {
  //   db.get('messages').push(req.body).write();
  //   return res.redirect('/?msgsemail=Сообщение отправлено')
  // }
  // res.redirect('/?msgsemail=Заполните все поля')
  // // console.log(req.body);

}