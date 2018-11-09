// Step 1 - Libraries
const path = require('path');
const express = require('express');
const mysql = require('mysql');
const auth = require('./auth');
const bodyParser = require('body-parser');
const multer = require ('multer');
const multipart = multer ({dest: path.join(__dirname, "/uploads/")});
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const utils = require('./libs/mysql-utils');
// const hbs = require('express-handlebars');
const sqlFindUserByEmail = "SELECT * FROM USER WHERE email = ?";


//Load MySQL and configure connection pool
const pool = mysql.createPool(require('./dbconfig'));

// Step 2 - Create instance of Express
const app = express();

//CORS
app.use(cors());

// Step 3 - Configure a connection pool to the database
// console.log("process.env.DB_PORT => ",process.env.DB_PORT);

var makeQuery = (sql, pool)=>{
    
    return  (args)=>{
        let queryPromsie = new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                if(err){
                    reject(err);
                    return;
                }
                
                connection.query(sql, args || [], (err, results)=>{
                    connection.release();
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(results); 
                })
            });
        });
        return queryPromsie;
    }
}

const sqlInsertUser = "INSERT INTO USER (email, password, name, salt) VALUES (?, ?, ?, ?)";
var insertUser = makeQuery(sqlInsertUser, pool);


var findUserByEmail = makeQuery(sqlFindUserByEmail, pool);


//-----GET-----USERS-----//-----GET-----USERS-----//-----GET-----USERS-----//

//Find all users
const sqlFindUsers = "SELECT * FROM user";
var findUsers = makeQuery(sqlFindUsers, pool);

app.get("/users", (req, res)=>{
    findUsers().then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find user by Id
const sqlFindUserId = "SELECT * FROM user WHERE (user_id = ?)";
var findUser = makeQuery(sqlFindUserId, pool);

app.get("/user/:userId", (req, res)=>{
    let userId = req.params.userId;
    console.log("in here ID");
    findUser([userId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})


//app.post register
app.post('/Register', bodyParser.urlencoded({ extended: true}), bodyParser.json({ limit: "50MB" }), (req, res)=>{
    console.log("Post backend register 1");
    let registerForm = req.body;
    let registrationObj = {...registerForm};
    console.log(JSON.stringify(registrationObj));
    let convertSecObj = convertPasswordToHash(registrationObj.password);
    registrationObj.password = convertSecObj.hash;
    registrationObj.salt = convertSecObj.salt;
    
    insertUser([registrationObj.email, 
        registrationObj.password, 
        registrationObj.name,
        registrationObj.salt]).then((results)=>{
        console.log(results);
        res.status(200).json({user: registrationObj});
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    });
})



//convertPasswordToHash
function convertPasswordToHash(password){
    salt = crypto.randomBytes(Math.ceil(16/2))
            .toString('hex') 
            .slice(0,16); 
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    console.log("SALT 1> ", salt);
    let hashObj = {
        salt: salt,
        hash: key.toString('hex')
    }
    return hashObj;
}

function isPasswordValid(password, currentHash, salt){
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return key.toString('hex') === currentHash;
}
//-----GET-----ASSETS-----//-----GET-----ASSETS-----//-----GET-----ASSETS-----//

//Find all assets 
const sqlFindAssets = "SELECT * FROM asset";
var findAssets = makeQuery(sqlFindAssets, pool);
app.get("/assets", (req, res)=>{
    findAssets().then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find assets by Id
const sqlFindAssetId = "SELECT * FROM asset WHERE (asset_id = ?)";
var findAsset = makeQuery(sqlFindAssetId, pool);
app.get("/asset/:assetId", (req, res)=>{
    let assetId = req.params.assetId;
    findAsset([assetId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})


//-----GET-----LOANS-----//-----GET-----LOANS-----//-----GET-----LOANS-----//

// Find all loans 
const sqlFindLoans = "SELECT * FROM loan";
var findLoans = makeQuery(sqlFindLoans, pool);
app.get("/loans", (req, res)=>{
    findLoans().then((results)=>{
        console.log(results);
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
 })

//Find loans by loan_id
const sqlFindLoanId = "SELECT * FROM loan WHERE (loan_id = ?)";
var findLoan = makeQuery(sqlFindLoanId, pool);
app.get("/loan/:loanId", (req, res)=>{
    let loanId = req.params.loanId;
    findLoan([loanId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find loans by user_id
const sqlFindLoanUserId = "SELECT * FROM loan WHERE (user_id = ?)";
var findLoanUser = makeQuery(sqlFindLoanUserId, pool);
app.get("/loan/user/:userId", (req, res)=>{
    let userId = req.params.userId;
    findLoanUser([userId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//Find loans by asset_id
const sqlFindLoanAssetId = "SELECT * FROM loan WHERE (asset_id = ?)";
var findLoanAsset = makeQuery(sqlFindLoanAssetId, pool);
app.get("/loan/asset/:assetId", (req, res)=>{
    let assetId = req.params.assetId;
    findLoanAsset([assetId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json(error);
    })
})

//-----POST-----USERS-----//-----POST-----USERS-----//-----POST-----USERS-----//

// const sqlAddUser = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
// const addUser = makeQuery(sqlAddUser, pool);
// app.post("/Register",
//         bodyParser.urlencoded(),
//         bodyParser.json(),
//         (req, resp) => {
//             console.log("Post backend register 2");
//             console.log("xxx in Register --> ", JSON.stringify(req.body));
//             addUser([req.body.name, req.body.email, req.body.password])
//                 .then(() => {
//                     resp.status(201).json({ message: 'New user created'})
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     resp.status(500).json({ error: err });
//                 })
//         }
//     )

    const sqlModifyUser = 'UPDATE user SET  name = ?, email = ? WHERE user_id = ?';
    const modifyUser = makeQuery(sqlModifyUser, pool);
    app.put('/user/:userId', bodyParser.json(), bodyParser.urlencoded(), (req, resp) => {
        console.log(req.body);
        modifyUser([req.body.name, req.body.email, parseInt(req.params.userId)])
            .then(() => {
                console.log('User record modified.');
                resp.status(200).json({ message: 'User details modified'})
            })
        .catch(err => resp.status(400).json({ error: err }))
    })

    const sqlRemoveUser = 'DELETE FROM user WHERE user_Id = ?';
    const removeUser = makeQuery(sqlRemoveUser, pool);
    app.delete("/user/:userId", (req, res)=>{
        removeUser([parseInt(req.params.userId)]).then((results)=>{
            res.json(results);
        }).catch((error)=>{
            res.status(500).json(error);
        })
    })

    // app.post('/Register', bodyParser.urlencoded({ extended: true}), bodyParser.json({ limit: "50MB" }), (req, res)=>{
    //     console.log("Post backend register 3");
    //     let registerForm = req.body;
    //     let registrationObj = {...registerForm};
    //     console.log(JSON.stringify(registrationObj));
    //     let convertSecObj = convertPasswordToHash(registrationObj.password);
    //     registrationObj.password = convertSecObj.hash;
    //     registrationObj.salt = convertSecObj.salt;
        
    //     insertUser([registrationObj.email, 
    //         registrationObj.password, 
    //         registrationObj.fullName,
    //         registrationObj.salt]).then((results)=>{
    //         console.log(results);
    //         res.status(200).json({user: registrationObj});
    //     }).catch((error)=>{
    //         console.log(error);
    //         res.status(500).json(error);
    //     });
    // })    


    // Change Password -> POST: /Change
// Requires: user.id, user.newpassword, user.password
// app.post('/Change', auth.required, bodyParser.urlencoded({ extended: true }), bodyParser.json({ limit: "50MB" }), (req, res) => {
    app.post('/Change', bodyParser.urlencoded({ extended: true }), bodyParser.json({ limit: "50MB" }), (req, res) => {
  
    console.log("Post backend change password");
    let changePasswordForm = req.body;
    let changePasswordObj = { ...changePasswordForm };
    console.log(JSON.stringify(changePasswordObj));
    // Additional validation on server side

    // Prevent empty password
    if (changePasswordObj.newPassword.length == 0) {
        console.log("Fail. New password cannot be empty.");
        res.status(500).json({ result: "Fail. New password cannot be empty." });
        return;
    }
    // Prevent empty password
    if (changePasswordObj.password.length == 0) {
        console.log("Fail. Current password cannot be empty.");
        res.status(500).json({ result: "Fail. Current password cannot be empty." });
        return;
    }
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/;
    let m;
    // Prevent invalid password
    if ((m = regex.exec(changePasswordObj.password)) === null) {
        console.log("Fail. Current password failed validation.");
        res.status(500).json({ result: "Fail. Current password failed validation." });
        return;
    }
    // Prevent invalid password
    if ((m = regex.exec(changePasswordObj.newPassword)) === null) {
        console.log("Fail. New password failed validation.");
        res.status(500).json({ result: "Fail. New password failed validation." });
        return;
    }

    let convertSecObj = convertPasswordToHash(changePasswordObj.newPassword);
    changePasswordObj.newPassword = convertSecObj.hash;
    changePasswordObj.salt = convertSecObj.salt;
    
    // Check old password is valid.
    // To protect against the scenario where user is already logged in, but someone else use his account and tries to change password.
    let oldPassword = changePasswordObj.password;
    console.log("oldPassword =", oldPassword);
    findUserByEmail([req.payload.username]).then((result) => {
        if (result.length > 0) {
            if (isPasswordValid(oldPassword, result[0].password, result[0].salt)) {
                console.log("ITS MATCH !");
                // Set the new password to password field.
                changePasswordObj.password = changePasswordObj.newPassword;
                // "UPDATE user SET password = ? , salt = ? WHERE id = ?"
                updateUserPassword([changePasswordObj.password,
                changePasswordObj.salt,
                req.payload.username]).then((results) => {
                    console.log("Success! results =>", results);
                    res.status(200).json({ result: "Success!" });
                }).catch((error) => {
                    console.log("Error! error =>", error);
                    res.status(500).json(error);
                });
            } else {
                console.log("Fail. Current password incorrect. result =>", result);
                res.status(500).json({ result: "Fail. Current password incorrect." });
                return;
            }
        } else {
            console.log("Fail. No record found. result =>", result);
            res.status(500).json({ result: "Fail. No record found." });
            return;
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
        return;
    })
})


//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//  

//app.use
app.use(express.static(path.join(__dirname, 'public')))

//Start the server
//Ping the database before starting
pool.getConnection((err, conn) => {
    if (err) {
        console.error('STARTUP ERROR: ', err);
        process.exit(-1);
    }
    conn.ping(err => {
        if (err) {
            console.error('PING ERROR: ', err);
            process.exit(-1)
        }
        conn.release();
        const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;
        app.listen(PORT, () => {
            console.info('Application started on PORT %d at %s', PORT, new Date());
        });
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
      findUserByEmail([email]).then((result)=>{
          if(result.length > 0){
              if(isPasswordValid(password, result[0].password, result[0].salt)){
                  console.log("ITS MATCH !");
                  return done(null, result[0]);
              }else{
                  return done(null, false, {errors: {'email or password': 'is invalid'}});
              }
          }else{
              return done(null, false, {errors: {'email or password': 'is invalid'}});
          }
      }).catch(done)
    
  }));

//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//-----//  
//login

  app.post('/Login', bodyParser.urlencoded({ extended: true}), bodyParser.json({ limit: "50MB" }), (req, res, next)=>{
    let user = {...req.body};
    let email = user.email;
    let password = user.password;
    console.log ("inLogin")

    if(!email){
        return res.status(422).json({errors: {email: "can't be blank"}});
      }
    
    if(!password){
    return res.status(422).json({errors: {password: "can't be blank"}});
    }
    
    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){ return next(err); }
        var today = new Date();
        var exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        let token = jwt.sign({
            id: user.user_id,
            username: user.email,
            exp: parseInt(exp.getTime() / 1000),
        //}, process.env.JWT_SECRET);
        }, "ILOVEMADRASAHIRSYAD");
        
        if(user){
          console.log("JWT token > ", token);
          user.token = token;
          return res.json({user: user});
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);
    
})



// port and server
// const PORT = parseInt(process.argv[2]) || 
//            parseInt(process.env.APP_PORT) || 3000;
// app.listen(PORT, () => {
//    console.info(`App started on port ${PORT} at ${new Date()}`);
// });
