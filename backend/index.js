const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())

const userRoutes = require('./controller/user');

app.use("/user", userRoutes);

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://admin:admin@cluster0.uvfwj5u.mongodb.net/auth", {
    useNewurlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected....")
})
app.get('/', (req, res) => {
    res.send("Hello World....");
});

app.listen(4000);
console.log('Web Server is listening at port 4000');

