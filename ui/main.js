console.log('Loaded!');

//var counter = 0;
//var button = document.getElementById('counter');

/*button.onclick = function () {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE)
        {
             if(request.status === 200)
             {
                 var counter = request.responseText;
                 var span = document.getElementById('count');
                 span.innerHTML = counter.toString();
                 
             }
        }
    };
    
    
    
    // make request 
    request.open('GET','http://santhoshdasari786.imad.hasura-app.io/counter',true);
    request.send(null);
    
   // counter = counter+1;
    
    //var span = document.getElementById("count");
    //span.innerHTML = counter.toString();
    //console.log('Loaded!');
};
*/
// submit
/*var nameInput = document.getElementById('name');
var names = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function ()
{
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE)
        {
             if(request.status === 200)
             {
                 var names = request.responseText; 
                 names = JSON.parse(names);
                 var list = [];
                  for(i=0; i<names.length ; i++)
                  {
                      list+= '<li>'+names[i]+'<li>';
                  }
                  var ul = document.getElementById('namelist');
                  ul.innerHTML = list;
                 
             }
        }
    };
    // make request 
    request.open('GET','http://santhoshdasari786.imad.hasura-app.io/submit-name?name='+name ,true);
    request.send(null);
};*/

var signin = document.getElementById('sbt_bttn');



signin.onclick = function() 
{
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
     console.log(password);
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                console.log('user is logged in');
                alert('Logged in successfully');
            }
            else if(request.status === 403)
            {
                   alert('username/password invalid');
            }
            else if(request.status === 500)
            {
                   alert('Loggedsomething went wrong');
            }
        }
    };
    
      request.setRequestHeader('Content-Type','application/json');
    request.open('POST','http://santhoshdasari786.imad.hasura-app.io/login' ,true);
  
    request.send(JSON.stringify({username: username, password: password}));
    
};

var signup = document.getElementById('sign_up');

signup.onclick = function() 
{
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
     console.log(password);
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                console.log('user is signedup');
                alert('User SignedUp successfully');
            }
            else if(request.status === 403)
            {
                   alert('username/password invalid');
            }
            else if(request.status === 500)
            {
                   alert('something went wrong');
            }
        }
    };
    
    
    request.open('POST','http://santhoshdasari786.imad.hasura-app.io/create-user' ,true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
};


