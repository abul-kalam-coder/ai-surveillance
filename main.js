video="";
var objects=[];
var status;


function preload(){
video=createVideo("video.mp4");
video.hide();
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
}


function detect(){
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Detecting Object"
}
function modelLoaded(){
    status=true;
 video.speed(1);
 video.volume(1);
 video.loop();
 console.log("model loaded");
}function gotResults(error,results){
    if(error){
        console.error(error);
    }else{
    console.log(results);
    objects=results;
    }}
    
function draw(){     
    image(video,0,0,500,400);
    r=random(255);
   g=random(255);
   b=random(255);
  
       if(status!=""){
           objectDetector.detect(video,gotResults);
           for(var i=0;i<objects.length;i++){
   document.getElementById("status").innerHTML="Status : Object Detected"
   document.getElementById("no_of_objects").innerHTML="Number of objects : "+objects.length;
    fill(r,g,b);
    stroke(r,g,b);
    noFill();
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
   rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
   }
       }
   }