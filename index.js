//Basic server sructure

// 1. import express
const express = require("express");

// importing the model from mongodb(databse).connecting server to database
const CourseInfo = require("./model.js/courseDB")

// 2. Initialising express
const app = new express();
const path= require('path');

//inorder to parsing body parameter we need 2 below code

// 3. API creation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));
//CORS policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

//if we click home page show message as "congrats!! the server is up"
// app.get("/", (req, res) => {
//     res.send("congrats!! the server is up")
// })

// //if we click about page show message as "Hi Dilma"
// app.get("/about", (req, res) => {
//     res.send("Hi Dilma Tomin")
// })

//Example for post.always we will show forms in body . thats why we used "req.body" below
// app.post("/facebook/signup",(req, res)=>{
//     res.send(`Hi ${req.body.name}, your account is successfully created`)
// })


//if we click json page show a json file
// app.get('/json', (req, res) => {
//     res.json([{"name":"dilma","place":"mala"},{"name":"tomin","place":"idukki"}])
// })

// creating document to the database. form il ninn ayirikkum data edukkunnath..form is  belongs to body of html.
// since user enter cheytha value aanu nammal edukkunnathinal nammal request cheyyunnath, from body il ninn...
// that is why we are using "req.body" in the below code

app.post("/api/create", (req, res) => {
    try {
        console.log("req.body", req.body);
        let course = CourseInfo(req.body);//passing data to db
        course.save(); //save data to db
        res.send("data added");
    } catch (error) {
        res.status(500).send(error);
    }

})

//read data from backend..async and awit is together. 
// we are telling system that execute next line if any line is having await. after executing that line only it will execute next line.
app.get("/api/view", async (req, res) => {
    try {
        let result = await CourseInfo.find();
        res.json(result)
    } catch (error) {
        res.status(500).send(error);
    }
})

// update
app.post("/api/update",async (req, res) => {
    try {
        await  CourseInfo.findByIdAndUpdate(req.body._id,req.body);
        res.send("data updated");
    } catch (error) {
        res.status(500).send(error);
    }

})

// delete
app.post("/api/delete",async (req, res) => {
    try {
        await CourseInfo.findByIdAndDelete(req.body._id);
        res.send("data deleted");
    } catch (error) {
        res.status(500).send(error);
    }

})

//search
app.post("/api/search",async (req, res) => {
    try {
        // let result= await CourseInfo.find(req.body);
        let result = await CourseInfo.find({ "movieName": { $regex: '.*' + req.body.movieName + '.*' } });
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }

})
app.get('/*', function (req,res) {
res.sendFile(path.join(__dirname,'/build/index.html'));
})

// 4. setting up port number
app.listen("5000", () => {
    console.log("using the 5000 port")
})