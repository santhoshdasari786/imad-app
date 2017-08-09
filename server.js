var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleslist = {
 'articleones' : {
     title : "santhosh",
     heading : "date",
     content : "helloe" 
},
'articletwos' : {
     title : "naveen",
     heading : "date",
     content : "helloe" 
},
'articlethrees' : {
     title : "hello",
     heading : "date",
     content : "helloe" 
},

}

function createTemplate (data) {

var title = data.title
var heading = data.heading;
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

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/articleone', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articleone.html'));
});

app.get('/:articlewo', function (req, res) {
    var articlewo = req.params.articlewo;
  res.send(createTemplate(articleslist[articlewo]));
});
var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString()); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
