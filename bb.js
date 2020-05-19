var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

const port = 2379;

//mongoose.connect("mongodb://localhost/tiny_url",{ useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/tiny_url', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


var urlSchema = new mongoose.Schema({
   small: String,
   large: String
});

var url = mongoose.model("url", urlSchema);

/*url.create({small:"a" , large:"b"} , function(err,op) {
  if(err){
    console.log(err);
  }
  else{
    console.log(op);
  }
});
*/
    
app.get("/", function(req, res){
    res.render("index");
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


app.get("/sumbit", function(req, res){
  var mj = req.query.text;
  url.create({small:"jj",large:mj});
  res.render("index");
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
