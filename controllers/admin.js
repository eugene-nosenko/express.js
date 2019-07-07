const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../database/db.js');

module.exports.get = function (req, res) {
  res.render('pages/admin', {
    title: 'Admin',
    msgfile: req.query.msgfile,
    msgskill: req.query.msgskill,
  })
}

// console.log('запустился перед аплоэдр ');
module.exports.post = (req, res, next) => {
  // console.log('запустился аплоэдр ');
  let form = new formidable.IncomingForm()
  let upload = path.join('./public', 'upload')

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload)
  }

  console.log(`dirname: ${__dirname}`)
  console.log(`cwd: ${process.cwd()}`)

  form.uploadDir = path.join(process.cwd(), upload)

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }
    // console.log(fields, files);

    const valid = validation(fields, files)

    if (valid.err) {
      fs.unlinkSync(files.photo.path)
      return res.redirect(`/?msgfile=${valid.status}`)
    }

    const fileName = path.join(upload, files.photo.name)

    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }

      let dir = fileName.substr(fileName.indexOf('\\'))
      // console.log(fileName);
      // let diruppic = path.join()
      // db.set(dir, fields.name, fields.price)
      const product = {
        src: path.join('upload', files.photo.name),
        name: fields.name,
        price: fields.price
      };
      // console.log(product);

      db.get('products').push(product).write();
      res.redirect('/admin/?msgfile=Картинка успешно загружена')
    })
  })
}

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return {
      status: 'Не загружена картинка!',
      err: true
    }
  }
  if (!fields.name) {
    return {
      status: 'Не указано название товара!',
      err: true
    }
  }
  if (!fields.price) {
    return {
      status: 'Нет цены товара!',
      err: true
    }
  }
  return {
    status: 'Ok',
    err: false
  }
}

module.exports.updateSkills = (req, res, next) => {

  // console.log(req.body);

  if (req.body.age && req.body.concerts && req.body.cities && req.body.years) {

    const skills = [{
        "number": req.body.age,
        "text": "Возраст начала занятий на скрипке"
      },
      {
        "number": req.body.concerts,
        "text": "Концертов отыграл"
      },
      {
        "number": req.body.cities,
        "text": "Максимальное число городов в туре"
      },
      {
        "number": req.body.years,
        "text": "Лет на сцене в качестве скрипача"
      }
    ]

    db.set('skills', skills).write();
    return res.redirect('/admin/?msgskill=All right')
  }

  res.redirect('/admin/?msgskill=Заполните все поля');

}