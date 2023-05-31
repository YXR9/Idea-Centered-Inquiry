var User = require('../models/userModel');
// Import module into the application
const crypto = require('crypto')
const mongoose = require('mongoose');

// Creating salt for all users
let salt = 'f844b09ff50c'

exports.register = (req, res, next) => {
    const data = req.body;
    // 確認沒有漏填欄位
    const noEmptyData = data.username && data.email && data.password && data.passwordConf && data.school && data.city;
    console.log(noEmptyData);
    console.log(req.body);

    // 確認第一次和第二次輸入的密碼相同
    const validConfirmPassword = req.body.password === req.body.password;
    if (!noEmptyData) {
      return res.status(400).send({
        status: 400,
        user: 'Some fields are empty.'
      });
    }

    if (!validConfirmPassword) {
      return res.status(400).send({
        status: 2,
        user: 'Passwords do not match.'
      });
    }

    // 資料無誤，將使用者填寫的內容存成物件
    const userdata = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      school: req.body.school,
      city: req.body.city,
    }

    User.findOne({
      // ensure email and nickname are unique, i.e the email and nickname are not already in the database
      email: req.body.email
    })
      .then(user => {
        // if the email is unique 
        if (!user) {
          let hashPassword = crypto.pbkdf2Sync(userdata.password, salt, 1000, 64, `sha512`).toString(`hex`);
          let hashPasswordConf = crypto.pbkdf2Sync(userdata.passwordConf, salt, 1000, 64, `sha512`).toString(`hex`);
          userdata.password = hashPassword
          userdata.passwordConf = hashPasswordConf
          // if the username is unique go ahead and create userData after hashing password and salt
          User.create(userdata)
          console.log("regist success!")
          res.send({
            status: 200,
            user: 'regist success!'
          })
        }
        else {
          // 當使用者輸入的 email 跟其他人的 email 相同
          return res.status(400).send({
            status: 4,
            user: 'That email already exisits!'
          });
        }
      })
      .catch(err => {
        // display error if an error occured
        res.send('error:' + err)
      });
}

exports.getLogin = (req, res) => {
    return res.render('login.ejs');
}

exports.postLogin = (req, res) => {
    var session = req.session;
    let username = req.body.username || req.body.email;

    User.findOne({
      $or: [{username:username},{email:username}]
    })
      .then(user => {
        // if the username and password match exist in database then the user exists
        if (user) {
          if(user.password == crypto.pbkdf2Sync(req.body.password, salt,  
            1000, 64, `sha512`).toString(`hex`)) {
              session.regenerate(function(err) {
                if(err) {
                  return res.status(400).send({
                    status: 9,
                    user: 'login failed...'
                  });
                }
                session._id = user._id
                session.email = user.email;
                session.username = user.username;

                console.log("Login successful!")
                console.log(session)
                console.log(req.sessionID)
                console.log(session.username)
                // after successful login display token data

                res.status(201).send(
                  {
                  status: 10,
                  user: 'login successful!',
                  token: req.sessionID,
                  userId: session._id,
                  username: session.username,
                  email: session.email,
                }
                );
              });
          }
          else {
            res.status(400).send({
              status: 6,
              user: 'Wrong password!'
            });
          }
        } 
        else {
          // if user cannot be found, display the message below
          res.status(400).send({
            status: 5,
            user: 'This user name or email is not regestered!'
          });
        }
      })
      // catch and display any error that occurs while trying to login user
      .catch(err => {
        res.send('error:' + err)
      })
}

exports.getProfile = (req, res) => {
    User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.username,"email":data.email});
		}
	});
}

exports.logout = (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
}

exports.getforgetpass = (req, res) => {
    res.render("forget.ejs");
}

exports.postforgetpass = (req, res) => {
    User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
}