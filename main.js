song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftwrist = 0 ;
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);

}

function preload(){
    song =loadSound("music.mp3");
}


function draw(){
image(video,0,0,600,500);

fill("#ff0000");
stroke("#ff0000");

circle(rightwristX,rightwristY,20);

if(rightwristY>0 && rightwristY <= 100){
    document.getElementById("speed").innerHTML ="Speed = 0.5x";
    song.rate(0.5);
}

if(rightwristY>100 && rightwristY <= 200){
    document.getElementById("speed").innerHTML ="Speed = 1x";
    song.rate(1);
}

if(rightwristY>200 && rightwristY <= 300){
    document.getElementById("speed").innerHTML ="Speed = 1.5x";
    song.rate(1.5);
}

if(rightwristY>300 && rightwristY <= 400){
    document.getElementById("speed").innerHTML ="Speed = 2x";
    song.rate(2);
}

if(rightwristY>400 && rightwristY <= 500){
    document.getElementById("speed").innerHTML ="Speed = 2.5x";
    song.rate(2.5);
}


if(scoreLeftwrist > 0.2){
circle(leftwristX,leftwristY,20);
InNumberLeftwristY= Number(leftwristY);
removedecimals= floor(InNumberLeftwristY);
Volume = removedecimals/500;
song.setVolume(Volume);
document.getElementById("volume").innerHTML = "Volume = " + Volume;
}
}


function modelLoaded(){
    console.log("PoseNet is initialised.")
}
function play_song(){
song.play();
song.rate(1);
song.setVolume(1);

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftwrist);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("LeftWrist X = " + leftwristX + "LeftWrist Y = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("RightWrist X = " + rightwristX + "RightWrist Y = " + rightwristY); 
      }
}

