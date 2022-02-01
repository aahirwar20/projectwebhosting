var express =require('express');
var app= express();
var fs = require('fs');
var bodyparser=require('body-parser');
var multer =require('multer');
var upload= multer();
var pack=require('./uipack');
var mongoose= require('mongoose');
var url =require('url');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var records=[];

const { stringify } = require('querystring');
mongoose.connect('mongodb://localhost:27017/my_db');
 
var formschema =mongoose.Schema({
    s_no:Number,
    name: String,
    data: String,
    

});

var form = mongoose.model("form",formschema);
var feedbackschema =mongoose.Schema({
    s_no:Number,
    feed: String
    
    

});

var feedback = mongoose.model("feedback",feedbackschema);
var countschema =mongoose.Schema({
    count:Number
    

});

var count = mongoose.model("count",countschema);
var sign_upschema =mongoose.Schema({
    s_no:Number,
    fname: String,
    lname: String,
    mbl: String,
    pin: Number,
    mail: String,
    pass: String

});

var sign_up = mongoose.model("sign_up",sign_upschema);
app.use(express.static('UI'));
app.use(express.static('home_page'));
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

app.get('/',function(req,res){
    fs.readFile('./home_page/home.html',function(err,data){
        if(err) throw err;
        else{res.write(data);
            res.end();}});
  });

  function check_sign_in(req,res,next){
    if(req.session.user){next();}
    else{res.redirect('/log-in');}

}

app.get('/note',check_sign_in,function(req,res){
    var a=req.session.user.id;
    if(a==1){
        var readerstream =fs.createReadStream('./UI/admin.html');
        readerstream.setEncoding('utf-8');
    readerstream.on('data',function(data){
        res.send(data);});
    readerstream.on('end',function(){});
    readerstream.on('error',function(data){
    console.log('error in data sent');
    });
    }
    else{
     var readerstream =fs.createReadStream('./UI/start.html');
    readerstream.setEncoding('utf-8');
readerstream.on('data',function(data){
    res.send(data);});
readerstream.on('end',function(){});
readerstream.on('error',function(data){
console.log('error in data sent');
});}
});



app.use('/note',function(req,res,next){
    res.redirect('/log-in');
});




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload.array());


app.get('/add',check_sign_in,function(req,res){
    form.find({s_no:req.session.user.id},function(err,data){
        if(err){throw err;}
        else{
            let s= pack(data);res.send(s);}});});

app.get('/addname',check_sign_in,function(req,res){
    var a={s_no:req.session.user.id};
    sign_up.find(a,function(err,data){
        var k={fname:data[0].fname,lname:data[0].lname}
        var t=JSON.stringify(k);
        res.write(t);res.end();})});

app.post('/form',check_sign_in,function(req,res){
    qu= url.parse(req.url,true).query;
 var formbody= new form({s_no:req.session.user.id,name:qu.name,data:qu.data});
 formbody.save(function(err,form){if(err){throw err;}});
 res.end();});


app.get('/delete',check_sign_in,function(req,res){var i;  
     ur =url.parse(req.url,true).query;
    var no= ur.index;
    form.find({s_no:req.session.user.id},function(err,data){
         if(err){ throw err;}
        else{ var j;
            for(j in data){if(j==no){var i=data[j].id; 
                form.findByIdAndRemove(i,function(err,dat){if(err){throw err;}else{ }});
                res.send('');}}}});});

 app.get('/uptade',check_sign_in,function(req,res){var i;  
             ur =url.parse(req.url,true).query;
            var no= ur.index;
            var nam =ur.name;
            var dat= ur.data;

            var d={s_no:req.session.user.id,name : nam,data: dat};
            form.find({s_no:d.s_no},function(err,data){
                 if(err){ throw err;}
                else{ var j;
                    for(j in data){
                        if(j==no){ var    i=data[j].id; 
                            form.findByIdAndUpdate(i,d,function(err,dat){
                                if(err){throw err;}
                                else{ }});
                            res.send('');}}}});});


     app.get("/log-in",function(req,res){

        fs.readFile('./log-in/log-in.html',function(err,data){
                     if(err) throw err;
                        else{res.write(data);
                     res.end();}});
                              });
                            
        
 
  app.get("/log-in/login-form?",function(req,res){
    qu= url.parse(req.url,true).query;
    var flag =0;
    var a={mail:qu.mail,pass:qu.pass};
    var id;
    sign_up.find(a,function(err,response){
        if(err){throw err;}
        if(response[0]==null){flag=1; }  
        else{id=response[0].s_no;}
        if(flag==1){
        res.redirect('/log-in'); }
    else{
       var b= {id:id,password:response[0].pass};
        req.session.user=b;
        res.redirect('/note');}});
  });

  app.post("/g_check",function(req,res){
    qu= url.parse(req.url,true).query;
    var flag =0;
    var a={mail:qu.mail};
   sign_up.find(a,function(err,response){
        if(response[0]==null){flag=1; }         
    if(flag==1){res.write('1');res.end();}
    else{ res.write('0');res.end();}
    });
  });

  app.get("/log-in/sign-up-form?",function(req,res){
    qu= url.parse(req.url,true).query;
    var flag =0;
    var a={mail:qu.mail};
    sign_up.find(a,function(err,response){
        if(response[0]==null){flag=1;}
if(flag==1){
     var c;
      count.find({},function(err,data){
           c=data[0].count+1;
          var co={count:c};
        count.updateMany({},co,function(err,data){
              if(err){throw err;}
     
var formbody= new sign_up({
          s_no:c,
        fname: qu.fname,
        lname: qu.lname,
        mbl: qu.mbl,
        pin: qu.pin,
        mail: qu.mail,
        pass: qu.pass
        });
    
    formbody.save(function(err,sign_up){
        if(err){throw err;}
    }); });
    var b= {id:c,password:qu.pass};
        req.session.user=b;
        res.redirect('/note');
    });
    }
      else{res.redirect('/log-in/sign-up');}});
 });

  app.get("/log-in/sign-up",function(req,res){
    
    app.use(express.static('log-in/sign-up.css'));
    fs.readFile('./log-in/sign-up.html',function(err,data){
        if(err) throw err;
        else{ res.write(data); res.end();}});
  });

  app.get("/log-out",function(req,res){
  req.session.destroy(function(){
      console.log('log out');
      res.redirect('/log-in');
  })
  });

  app.get("/log-in/sign-up.css",function(req,res){
    fs.readFile('./log-in/sign-up.css',function(err,data){
        if(err) throw err;
        else{res.write(data);res.end();}});
  });
  app.get("/log-in.css",function(req,res){
    fs.readFile('./log-in/log-in.css',function(err,data){
        if(err) throw err;
        else{ res.write(data);res.end(); }});
  });
  
  app.get("/UI/bc_1.jpg",function(req,res){
    fs.readFile('./UI/bc_1.jpg',function(err,data){
        if(err) throw err;
        else{res.write(data);res.end();}});
  });

  app.get("/log-in/sing-up.js",function(req,res){
    fs.readFile('./log-in/sing-up.js',function(err,data){
        if(err) throw err;
        else{res.write(data);
            res.end();}});
  });
  app.get("/home.css",function(req,res){
    fs.readFile('./home_page/home.css',function(err,data){
        if(err) throw err;
        else{res.write(data);
            res.end();}});
  });
  
  app.get("/feedback",function(req,res){
var qu=url.parse(req.url,true).query;
var a=new feedback({
    s_no:req.session.user.id,
    feed:qu.feedback
});

a.save(function(err,feedback){
    if(err){throw err;}
});
res.redirect('/note');
  });
  function check_feed(req,res,next){
        if(req.session.user.id==1){
            next();
        
    }
    else{res.redirect('/log-in');}

}
 async function find_feed(req){
    
     
   
   
   
}

app.get("/feed_check",check_feed,function(req,res){
    fs.readFile('./UI/feedback.html',function(err,data){
        if(err) throw err;
        else{res.write(data);
            res.end();}});
});

app.get("/add_feed",check_feed,function(req,res){
    var t,m,k;
    feedback.find({},function(err,data){
        if(err){throw err;}
        else{
            
            for(t in data){
                m={
                    
                    s_no:data[t].s_no,
                    feed:data[t].feed
                };records.push(m);}}
  var s={f:records};
            k=JSON.stringify(s); 
        res.write(k);
    res.end();       }); 
  
});

        
app.listen(8000);
