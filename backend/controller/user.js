const express = require('express');
const router = express.Router();
const Users = require("../schema/user")

router.post("/addUser", (req, res) => {
    // console.log("Request: ",req)
    let newUser = req.body;
    const user = new Users(newUser)
    user.save(err => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(user)
            res.send(user)
        }
    })
})

router.post("/login", (req, res) => {
    // console.log("Request: ",req)
    let user = req.body;
    try {
        Users.findOne({ email: user.email })
            .then(
                data => {
                    if (data) {
                        console.log(data.email)
                        if (data.password === user.password) {
                            console.log("Login in");
                            res.send("Successfully Loged in... ")
                        }
                        else {
                            res.send("Incorrect password");
                        }
                    }
                    else {
                        console.log("User not found...")
                        res.send("User not found...")
                    }
                }
            )
            .catch(err => console.log("User not found...", err))
    }
    catch {
        err => console.log(err)
    }
})

router.get('/getUser', (req, res) => {
    Users.find()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.log(error))
});



module.exports = router;