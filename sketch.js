const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var score=0;
var gameState = "onSling";
var birds=[];

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    getBgImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
      bird2=new Bird(150,170);
      bird3=new Bird(100,170);
      bird4=new Bird(50,170);
      birds.push(bird);
      birds.push(bird2);
      birds.push(bird3);
       birds.push(bird4);
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(birds[birds.length-1].body,{x:200, y:50});

    
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    noStroke();
    textSize(35);
    fill ("white");
    text("Score:"+ score ,width-300,50);
    pig1.score();
    pig3.score();
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
     Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5,y:5})
     return false
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop();
    return false
}

function keyPressed(){
    if(keyCode === 32&&birds.length>=0&&gameState==="launched"){
        slingshot.attach(birds[birds.length-1].body);
       
        birds[birds.length-1].trajectory=[];
        Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:50});
        gameState="onSling";
    }
}
 async function getBgImg(){
    var response= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var response_JSON =await response.json();
    console.log(response_JSON);
    var dateTime = response_JSON.datetime;
    console.log(dateTime);
    var hour = dateTime.slice(11,13);
    console.log(hour);
    if (hour>=06&&hour<=18){
      backgroundImg=loadImage("sprites/bg.png")
    }
    else{
        backgroundImg=loadImage("sprites/bg2.jpg")
    }
} 