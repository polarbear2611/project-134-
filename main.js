status = "";
objects = [];
song ="";
function preload() {
    song = loadSound('alarm.wav');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
   video = createCapture(VIDEO);
   video.size(380,380);
   video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting object";
}

function draw() {

    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
          
             document.getElementById("baby_found").innerHTML = "Baby found";
              document.getElementById("status").innerHTML = "Status : object detected";
             
              percentage = floor(objects[i].confidence * 100);
              r=random(255);
              g=random(255);
              b=random(255);
              fill(r,g,b);
              text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
              noFill();
              stroke(r,g,b);
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
              if(objects[i].label == "person")
              {
                document.getElementById("status").innerHTML = "Status : object detected";
                document.getElementById("baby_found").innerHTML = "Baby found";
                song.stop()
              }
               else
               {
                document.getElementById("status").innerHTML = "Status : object  not detected";
                document.getElementById("baby_found").innerHTML = "Baby not found";
                song.play()
               }
             }
           
        
       
         if(objects.length==0)
         {
          document.getElementById("status").innerHTML = "Status : object  not detected";
          document.getElementById("baby_found").innerHTML = "Baby not found";
          song.play()
         }
    }
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
   
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}