var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

const port = 2345;

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
    console.log("index");
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

app.post("/submit", function(req, res){
	var mj = req.body.text;

	 url.findOne({large:mj},function(err,opp) {
	 	if(err)
	 	{
	 		console.log(err);
	 	}
	 	else
	 	{
	 		if(opp == null)
	 		{
                  // console.log("hi1");

	 		    			var mjj = makeid(5);

	 	                    var ioy = "localhost:"+port+"/"+mjj;


	 		    	console.log(ioy);
	 		    	url.create({small : ioy,large:mj},function(err,bb){
	 		    		if(err)
	 		    			{console.log(err);}

	 		    	});
	 		    	var sm = {small:ioy,large:mj}
                  		res.render("index2",{io:sm});


	 		}
	 		else{
	 			url.findOne({large:mj},function(err,opp) {
	 				if(err)
	 				{
	 					console.log(err);
	 				}
	 				else
	 				{
	 					res.render("index2",{io:opp});
	 				}
	 			});
	 		}
	 	}
	 });

});

app.get("/:id", function(req, res){
    console.log("id");
      var kl = req.params.id;
     // res.send(kl);
      var ii = "localhost:"+port+"/"+kl;
      url.findOne({small:ii},function(err,ioo){
             if(err)
             {
             	console.log(err);
             }
             else
             {

             	 res.redirect(ioo.large);
             }

      });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
