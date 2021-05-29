img = "";
status_tv = "";
objects = [];

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_tv").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status_tv = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("Error");
    } else {
        console.log(results);
        objects = results;
    }
}

function preload() {
    img = loadImage("TV and AC.jpeg");
}

function draw() {
    image(img, 0, 0, 600, 450);
    if (status_tv != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status_tv").innerHTML = "Status: Object Detected";
            fill("#4287f5");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y - 10);
            noFill();
            fill("#fff");
            text("Number of objects =" + objects.length, 10, 15);
            noFill();
            stroke("#4287f5");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}