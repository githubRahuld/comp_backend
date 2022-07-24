const express = require("express");
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000
require("./db/conn");
const User = require("./models/usermessage");
const app = express();


//seting the path 
const staticpath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//middleware
//bestway to include bootstrap and jquery in node js applications
app.use('/css',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.set("view engine" , "hbs")
app.set("views", templatePath);
hbs.registerPartials(partialsPath);





app.get("/", (req,res) =>{
    res.render("index");
})

app.post("/contact" , async(req,res) =>{
    try {
        // res.send(req.body);
        const userData = new User(req.body); //jo bhi user ne data(req.body) fill kiya hai use new documenet(userData) me store  krodo  
        await userData.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(500).send(error);
    }
})




app.listen(port , () =>{
    console.log(`connection establised at port ${port}`);
})
