const e = require('express');
var express = require('express');
var router = express.Router();

const credentials = {
    username: 'admin',
    password: 'admin'
}
//login user
router.post('/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    if (username == credentials.username && password == credentials.password) {
        req.session.user = username;
        res.redirect('/admin');
        //res.end("success");
    } else {
        res.end("Invalid credentials");
    }
});

//admin
router.get('/admin', (req, res) => {
    if (req.session.user) {
        res.render('admin', {
            title: 'Admin',
            user: req.session.user
        });
    } else {
        res.send("You are not admin");
    }
});

//logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.render('base', {title: "Logout", logout: "Logout Successful"});
        }
    });
});

//secret pages that no one has access to (muahahaha)
router.get('/secret', (req, res) => {
    if (req.session.user) {
        res.render('secret', {
            title: 'My Idols Collection 🤩🤩',
            user: req.session.user
        });
    } else {
        res.send("You are not Lucgr");
    }
});

module.exports = router;