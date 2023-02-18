const express = require('express');
const router = express.Router();
const Users = require("../schema/user");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/addUser", (req, res) => {
    let newUser = req.body;
    var hashedPassword = bcrypt.hashSync(newUser.password, 8);
    Users.findOne({ email: newUser.email })
        .then(
            data => {
                if (data) {
                    console.log("User already exists.");
                    res.send("User already exists.");
                }
                else {
                    Users.create(
                        {
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            password: hashedPassword
                        },
                        function (err, user) {
                            if (err) return res.status(500).send("There was a problem registering the user.")
                            // create a token
                            var token = jwt.sign({ id: user._id }, "mySecret", {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            console.log("Token done.")
                            res.status(200).send({ auth: true, token: token });
                        });
                    // user.save(err => {
                    //     if (err) {
                    //         console.log("Got some error in adding user.")
                    //         res.send(err)
                    //     }
                    //     else {
                    //         console.log("User Added: ", newUser.email)
                    //         res.send(user)
                    //     }
                    // })
                }
            });
})

router.post("/login", (req, res) => {
    // console.log("Request: ",req)
    Users.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, "mySecret", {
            expiresIn: 86400 // expires in 24 hours
        });
        console.log("Successfully loged in...")
        res.status(200).send({ auth: true, token: token });
    });
})

router.get('/logout', function (req, res) {
    console.log("Logging out...")
    res.status(200).send({ auth: false, token: null });
});

router.get('/getUser', function (req, res, next) {

    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, "mySecret", function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Users.findById(decoded.id,
            { password: 0 }, // projection
            function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");

                res.status(200).send(user);
                // next(user); // add this line
            });
    });
});

// add the middleware function
router.use(function (user, req, res, next) {
    res.status(200).send(user);
});

router.get('/getUser', (req, res) => {
    Users.find()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.log(error))
});



module.exports = router;