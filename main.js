status = ""
animal = ""
objects = [ ]

function setup() {
    canvas = createCanvas(350, 200);
    canvas.position(550,500);
    video = createCapture(VIDEO);
    video.size(350, 200);
    video.hide();
}

function identify() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  animal = document.getElementById("object").value;
}
function modelLoaded() {
    console.log("CocoSSD Load Status: Loaded")
    status = true;
}

function draw() {
    image(video, 0, 0, 350, 200);
    if(status != "")
    {
      objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        console.log(objects.length);
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if (objects[i].label == animal) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("animal").innerHTML = animal + " successfully detected";
            speech = window.speechSynthesis;
            utter = new SpeechSynthesisUtterance(animal + "successfully detected");
            speech.speak(utter);
        }
        else {
            document.getElementById("animal").innerHTML = animal + " not detected";
        }
      }
    }
    

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }
}