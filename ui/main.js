console.log('Loaded!');

var counter = 0;
var button = document.getElementById("counter");

button.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpReuest.DONE)
        {
             if(req)
        }
    }
    
    counter = counter+1;
    
    var span = document.getElementById("count");
span.innerHTML = counter.toString();
}