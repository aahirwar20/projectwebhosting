var express =require('express');
var app= express();
var fs = require('fs');
var bodyparser=require('body-parser');
var multer =require('multer');
var upload= multer();
var pack=require('./uipack');
var mongoose= require('mongoose');
var url =require('url');
mongoose.connect('mongodb://localhost:27017/my_db');
var formschema =mongoose.Schema({
    name: String,
    data: String

});

var form = mongoose.model("form",formschema);
app.use(express.static('UI'));

app.get('/',function(req,res){
    
    fs.readFile('./UI/start.html',function(err,data){
        if(err) throw err;
        else{
        
            res.send(data);
            

            
        }
    });
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload.array());
app.get('/add',function(req,res){
    form.find({},function(err,data){
        if(err){throw err;}
        else{
            let s= pack(data);
            res.send(s);}
         });
});


app.post('/form',function(req,res){
    
    qu= url.parse(req.url,true).query;
 var formbody= new form({
     name:qu.name,
     data:qu.data
     
 });
 console.log(qu.data);
 formbody.save(function(err,form){
     if(err){throw err;}
 });
 
 res.end();
});

app.get('/add',function(req,res){
    form.find({},function(err,data){
        if(err){throw err;}
        else{
            let s= pack(data);
            res.send(s);}
         });
});


app.get('/delete',function(req,res){
    var i;  
     ur =url.parse(req.url,true).query;
    var no= ur.index;
    form.find({},function(err,data){
         if(err){ throw err;}
        else{ 
            var j;
            for(j in data){
                if(j==no){
                 var    i=data[j].id; 
                    form.findByIdAndRemove(i,function(err,dat){
                        if(err){throw err;}
                        else{ }
                    });
                    res.send('');
                
                }
            }
        }});});
        app.get('/uptade',function(req,res){
            var i;  
             ur =url.parse(req.url,true).query;
            var no= ur.index;
            var nam =ur.name;
            var dat= ur.data;
            var d={
                name : nam,
                data: dat
            };
            form.find({},function(err,data){
                 if(err){ throw err;}
                else{ 
                    var j;
                    for(j in data){
                        if(j==no){
                         var    i=data[j].id; 
                            form.findByIdAndUpdate(i,d,function(err,dat){
                                if(err){throw err;}
                                else{ }
                            });
                            res.send('');
                        
                        }
                    }
                }});
              
              
        });


        app.use(express.static('log-in'));

 app.get('/log-in',function(req,res){
    var ur =url.parse(req.url,true).query;
    console.log(ur);
    fs.readFile('./log-in/log-in.html',function(err,data){
        if(err) throw err;
        else{

            res.write(data);
            res.end();

            
        }
    });
 })
  app.get("/login-form",function(req,res){
      
res.end();
  });
  app.get("/log-in/sign-up",function(req,res){
    fs.readFile('./log-in/sign-up.html',function(err,data){
        if(err) throw err;
        else{

            res.write(data);
            res.end();

            
        }});
  });

  app.get("/log-in/log-in.css",function(req,res){
    fs.readFile('./log-in/log-in.css',function(err,data){
        if(err) throw err;
        else{

            res.write(data);
            res.end();

            
        }});
  });
        
app.listen(3000);
