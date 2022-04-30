


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


var server = "us8";
var listId= "5159caf7e2";
var appiKey = "f5583bd8aac7cfeb3599855b80483623-us8";


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var data =
            {
                'email_address': req.body.email,
                'status': 'subscribed',
                'merge_fields':{
                    'FNAME': req.body.firstName,
                    'LNAME': req.body.lastName
                }

            };


    var jsonData = JSON.stringify(data);
    const url = 'https://' + server + '.api.mailchimp.com/3.0/lists/' + listId + '/members/';
    const options ={
        method: "POST",
        auth: "anyname:"+ appiKey
    }

    const request = https.request(url,options,function(response){

      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
})








//5159caf7e2
//f5583bd8aac7cfeb3599855b80483623-us8
