const express = require("express") ;
const bp = require("body-parser") ;
const app = express();
const request = require("request")
const https = require("https");
const ejs = require('ejs');
const _ = require("lodash")


const homeC = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis dolorum nam aperiam sit quisquam voluptatibus, pariatur nihil! Corporis, ipsum repellendus eligendi eum consequatur iste saepe, quod, nihil corrupti animi reiciendis";
const aboutC = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis dolorum nam aperiam sit quisquam voluptatibus, pariatur nihil! Corporis, ipsum repellendus eligendi eum consequatur iste saepe, quod, nihil corrupti animi reiciendis";
const contactC = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis dolorum nam aperiam sit quisquam voluptatibus, pariatur nihil! Corporis, ipsum repellendus eligendi eum consequatur iste saepe, quod, nihil corrupti animi reiciendis";

const blogPosts = [{postTitle: "jay",postBody : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ipsum incidunt in itaque, id vero qui. Eveniet consequuntur voluptatibus exercitationem eligendi laborum explicabo excepturi aspernatur, animi vel dicta "}];
const blog = "";
let topic = "";


app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// ----------------------------- ALL APP.GET ROUTE -------------------------------------

app.get("/", function(req, res){
    // console.log(blogPosts[postTitle], blogPosts[postBody] )
    res.render("home", {home:homeC, posts: blogPosts, topic:blog});
});
// app.get("/home", function(req, res){
//     res.render("home", {home:homeC, post:blogPosts});
// });
app.get("/About", function(req, res){
    res.render("about", {home:homeC});
});
app.get("/Post", function(req, res){
    res.render("Post", {home:homeC});
});
app.get("/Compose", function(req, res){
    res.render("compose", {home:homeC});
});
app.get("/Contact", function(req, res){
    res.render("contact", {home:homeC});
});
app.get("/post/:topic", function(req, res){
   
    topic =  _.lowerCase(req.params.topic);
    blogPosts.forEach(function(blog){
        let storedTitle = _.lowerCase(blog.postTitle);
        
        if (storedTitle == topic){
           res.render("post", {title: blog.postTitle , content:blog.postBody} );
        }

    })
    
    

})
// ----------------------------- ALL APP.POST ROUTE -------------------------------------
app.post("/", (req, res)=>{
    topic = req.body.post
    let blogPost ={postTitle : req.body.postTitle, postBody : req.body.postBody } ;
    blogPosts.push(blogPost);
    console.log(topic, blogPosts, req.body)
    res.redirect("/")

})
app.listen(3000 , function(){
    console.log("server started successfully")
})

// app.post("/", function(req, res){
//     var fname = req.body.fName;
//     var lname = req.body.lName;
//     var email = req.body.email;

//     console.log(fname, lname, email);

//      var data = {
//         members : [
//             {
//                 email_address : email,
//                 status : "subscribed",   
//                 merge_fields: {
//                     FNAME : fname,
//                     LNAME : lname
//                 }
//             }
            

//         ]
//      }

//      var jsondata = JSON.stringify(data);

//      var url = "https://us9.api.mailchimp.com/3.0/lists/aeea2e9dd0";
//      var options = {
//         method : "POST",
//         auth : "jay: 0150d52340322ffbd664850db44ac38d-us9"

//      }
//      const request = https.request(url , options, function(response){
//         response.on("data", function(data){
//             console.log(JSON.parse(data))
//         })
//      })
//      request.write(jsondata);
//      request.end;
// })



// api key
// 0150d52340322ffbd664850db44ac38d-us9  audience id c