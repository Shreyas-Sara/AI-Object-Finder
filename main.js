objects = [];
status = "";
product = "";

function setup() {
    canvas = createCanvas(480, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    detector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Detecting Object";
    console.log("Hi")
}

function modalLoaded(){
    console.log("Modal loaded Successfull");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 480, 300);
    product = document.getElementById("input").value
    if(status != ""){
        detector.detect(video, gotResults)
        for( i = 0; i < objects.length; i++){
                if(objects[i].label == product){
                    document.getElementById("status").innerHTML = "Object Detected";
                    document.getElementById("found").innerHTML = "Found " + product;
                    fill("orange");
                    percent = floor(objects[i].confidence * 100);
                    text(product + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke("green");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
}