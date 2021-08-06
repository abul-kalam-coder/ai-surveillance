var status="";
img="";

 var objects=[];
function preload(){
    img=loadImage("dog_cat.jpg")
}
function setup(){
canvas=createCanvas(300,300);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(300,300);
video.position(0,0);
objectDetector=ml5.objectDetector("cocossd",model_loaded);
document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function model_loaded (){
    status=true;
    console.log("model_loaded");
    objectDetecter.detect(video,gotResults());
}

function gotResults(error,results){
    if(error){
console.error(error);
    }else{
        console.log("👍");
        console.log(results);
        objects=results;
        objectDetecter.detect(video,gotResults);
    }
}
function draw(){
image(video,0,0,300,300 );
if(status != ""){
    objectDetecter.detect(video,gotResults);
    r=random(255);
    g=random(255);
    b=random(255);
    for(var i = 0;i<objects.length;i++){
        fill(r,g,b);
        stroke(r,g,b);
        noFill();
    percent=floor(objects[i].confidence*100);

    text(objects[i].label+" "+percent+" % ",objects[i].x+20,objects[i].y+20);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    document.getElementById("status").innerHTML="Status:Object Detected";
    document.getElementById("no_of_objects").innerHTML="Number of objects detected are : "+objects.length;

    }
   }
}

