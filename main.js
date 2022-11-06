img = "";
objects = [];

function setup() {
    canvas = createCanvas(450, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 450)
    video.hide();
    objectDetector = ml5.objectDetector('cocosd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
}
status1 = "";
function modelLoaded() {
    console.log('Cocosd IS WORKING');
    status1 = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 450, 450);

    if(status1 != "") {
        objectDetector.detect(video, gotResults);
        document.getElementById("status").innerHTML = "Objects have been Detected";
        for(i = 0; i < objects.length; i++) {
        fill('red');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke('red');
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}