console.log('Loaded!');

var counter = 0;
var button = document.getElementById("counter");
var span = document.getElementById("count");
span.innerHTML = counter.toString();
button.onclick = function(){
    counter = counter+1;
}