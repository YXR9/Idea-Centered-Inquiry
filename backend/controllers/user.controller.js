const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const readXlsxFile = require("read-excel-file/node");

// Assigning users to the variable User
const User = db.User;
const Profile = db.Profile;
const Op = db.Sequelize.Op;

// signing a user up
// hashing users password before its saved to the database with bcrypt
exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConf, school, city } = req.body;
    
    // Check if password and passwordConf match
    if (password !== passwordConf) {
      return res.status(400).send("Password and password confirmation do not match.");
    }
    
    const data = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      school,
      city
    };

    //saving the user
    const user = await User.create(data);
 
    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
 
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.batchRegistration = async (req, res) => {
  console.log(req.file);
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(path).then(function (rows) {
      // skip header
      rows.shift();

      let users = [];
      let profiles = [];
      

      rows.forEach(async (row) => {
        console.log(row);
        let user = {
          name: row[0],
          email: row[1],
          password: await bcrypt.hash(row[2], 10),
          school: row[3],
          city: row[4],
        };
        console.log(await bcrypt.hash(row[2], 10))
        users.push(user);
      });

      User.bulkCreate(users)
        .then((data) => {
            for(let i=0; i<data.length; i++){
              let profile = {
                userId: data[i].dataValues.id,
                className: rows[i][5],
                studentId: rows[i][6],
                year: rows[i][7],
                sex: rows[i][8]
              }
              console.log("profile: ", profile);
              profiles.push(profile);
              console.log("profiles: ", profiles, profiles.length);
            };
            console.log("pro: ", profiles);

            Profile.bulkCreate(profiles)
            .then(() => {
              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            })
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error,
          });
        });
    });
  } catch (error) { 
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email
      } 
    });

    //if user email is found, compare password with bcrypt
    if (!user) {
      return res.status(401).send("Authentication failed");
    }

    const isSame = await bcrypt.compare(password, user.password);
    console.log('1')
    //if password is the same
      //generate token with the user's id and the secretKey in the env file

    if (!isSame) {
      return res.status(401).send("Authentication failed");
    }
    console.log('2')
    let token = jwt.sign({ id: user.id }, process.env.secretKey, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    console.log('3')
    //if password matches wit the one in the database
    //go ahead and generate a cookie for the user
    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
    console.log("user", JSON.stringify(user, null, 2));
    console.log(token);
    //send user data
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
  }
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    // const activity = req.query.activity;
    // var condition = activity ? { activity: { [Op.iLike]: `%${activity}%` } } : null;
  
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + id
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all users."
        });
    });
};