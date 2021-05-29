img = "";
status_desk = "";
objects = [];

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_desk").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status_desk = true;
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
    img = loadImage("desk.jpeg");
}

function draw() {
    image(img, 0, 0, 600, 450);
    if (status_desk != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status_desk").innerHTML = "Status: Object Detected";
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