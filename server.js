var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');


//require('babel');
//require('request');
// {request} from 'request';
//require('graphql');



/*import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';*/

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      }
    }
  })
});

var query = `
  query HelloQuery {
    { hello }
  }
`;

graphql(schema, query).then((result) => {
  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(result);
});



var config = {
    user: 'santhoshdasari786',
    database: 'santhoshdasari786',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: 'db-santhoshdasari786-55778' //process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json()); 

var articleslist = {
 'articleones' : {
     title : "santhosh",
     heading : "date",
     date : 'aug-15',
     content : "helloe" 
},
'articletwos' : {
     title : "naveen",
     heading : "date",
     date : 'aug-15',
     content : "helloe" 
},
'articlethrees' : {
     title : "hello",
     heading : "date",
     date : 'aug-15',
     content : "helloe" 
},

};

function createTemplate (data) {


var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;


var htmltamplate = `
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name = "viewport" content = "width=device-width, initial-scale-1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class= "container">
        <div>
            <a href="/">Home</a>
        </div>
        
        <hr/>
        
         <h1> header one</h1>
    <p> ${heading}</p>
    
    <div>
        <h2>
            header two
        </h2>
        <p>
            ${content}
        </p>
    </div>
    
    <div>
        <title>
            hello
        </title>
         <p>
            ${date}
        </p>
    </div>
    
      <h3> header three</h3>
      <h4> header four</h4>
       <h5> header five</h5>    
       
       </div>
    </body>
</html>
 `;
 
 return htmltamplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool = new Pool(config);

app.get('/test-db', function(req,res)
{
    pool.query('SELECT * FROM test', function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString()); 
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/articleone', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articleone.html'));
});

var names = [];
app.get('/submit-name',function(req, res){
    // get the name from request
    var name = req.query.name;
    
    names.push(name);
     
    res.send(JSON.stringify(names));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/articles/:articlewo', function (req, res) {
    var articlewo = req.params.articlewo;
    
   // var articleData = 
    pool.query("SELECT * FROM articles WHERE title = $1", [req.params.articlewo], function (err, result){
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           if(result.rows.lemgth === 0)
           {
               res.status(404).send('ARTICLE NOT FOUND');
           }
           else
           {
               var ari = result.rows[0];
               res.send(createTemplate(ari));
           }
       }
    });
 
});

function hash (input,salt )
{
  var hashed = crypto.pbkdf2Sync(input,salt,10000, 512, 'sha512');
  return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$$$$$$$$');
}

app.get('/hash/:input', function(req, res)
{
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    
    
    res.send(hashedString);
});

app.post('/create-user',function(req,res)
{
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt) ;
   pool.query('INSERT INTO "users"(username,password) VALUES($1,$2) ',[username,dbString], function(err, result)
   {
        if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       { 
           res.send('USER SUCCESSFULLY CREATED '+username);
           
       }
   });
});

app.post('/login', function(req,res){
    
    var username = req.body.username;
    var password = req.body.password;
  
   pool.query('SELECT * FROM "users" WHERE username = $1 ',[username], function(err, result)
   {
        if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       { 
            if(result.rows.lemgth === 0)
           {
               res.status(403).send('USERNAME OR PASSWORD IS INVALID');
           }
           else {
               var dbString  = result.rows[0].password;
               var salt = dbString.split('$$$$$$$$')[2];
               var hashPassword  = hash(password,salt );
               if(hashPassword === dbString)
               {
                   res.send('Credentials Correct '); 
               }
               else{
                   res.send(403).send('username/password is invalid');
               }
           }
           
       }
   });
   
});

app.get('/signin', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'loginform.html'));
});

/*app.get('/:articlewo', function (req, res) {
    var articlewo = req.params.articlewo;
  res.send(createTemplate(articleslist[articlewo]));
});*/


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
