// importing
const mongoose=require("mongoose")

// Connect to database by pasting link from mongoDB.don't fogot to replace the paswd with atlas pswd.
mongoose.connect("mongodb+srv://dilmajoyd:atlas@cluster0.5h9hweq.mongodb.net/?retryWrites=true&w=majority")

// Schema-defines how the structrue of collection in the database should be. storing schema of mongoose to a variable
const Schema=mongoose.Schema;

//create new schema for course using the above created variable
const courseSchema=new Schema({
    movieName:String,
    actor:String,
    actress:String,
    director:String,
    camera:String,
    year:Number,
    language:String
})

//passing collectionname("courses") and schema("courseSchema"). 
// collectionname and schema together is called model. Storing this model to a variable

const CourseInfo=mongoose.model("courses",courseSchema)

//exporting the model
module.exports=CourseInfo;