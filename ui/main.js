console.log('Loaded!');

//var counter = 0;
var button = document.getElementById("counter");

button.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpReuest.DONE)
        {
             if(reqest.status == 200)
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
    
  //  counter = counter+1;
    
    //var span = document.getElementById("count");
//span.innerHTML = counter.toString();
};