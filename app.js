var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/groceries", { useMongoClient: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

var grocerySchema = new mongoose.Schema({
 
  title: String,  
  description: String,
  purchased: Boolean      //To be used in user story 6
});

var Grocery = mongoose.model("Grocery", grocerySchema);

app.get("/", function(req,res){
   
// Get list of all grocery items from database

    Grocery.find({}, function(err,allItems){
        
       if(err){
        
            console.log(err);
       }else{
           
           res.render("landing",{items:allItems});
       } 
    });
});

app.post("/",function(req,res){
    
    var title = req.body.title;
    var description = req.body.description;
    var newItem = {title:title, description:description};
    Grocery.create(newItem, function(err, newlyCreated){
        
       if(err){
           
           console.log(err);
       } else{
           
           res.redirect("/");
       }
    });
    
});

app.get("/new", function(req,res){
    
        res.render("new.ejs")
});

app.get("/:id", function(req,res){
    
    //find the Grocery item with provided ID
    
    Grocery.findById(req.params.id, function(err, foundItem){
        
        if(err){
            console.log(err);
        }else{
        // render show template with that item    
            res.render("show", {item: foundItem});         
            
        }
    });
   
   
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    
   console.log("My first grocery list") 
    
});