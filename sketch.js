var v = 7; 
var eNum = 3; 
var fc = 15; 
var enemy;

var gameState = "play";
var stage = 1;

var kill = 0, total=5; // enemies killed
var collected = 0; 
var direction;

var gameState = "play";
var stage = 1;

// var tunnel = createSprite(0,0,100,50);
// tunnel.shapeColor = "blue";

// var tunnelUp = createSprite(0,0,100,10);
// tunnelUp.shapeColor = "black";
// var tunnelDown = createSprite(0,0,100,10);
// tunnelDown.shapeColor = "black";

//  var enemyGroup = new Group();
// enemyGroup.setRotateToDirectionEach(true);

// var gate = createSprite(0,0,20,70);
// gate.shapeColor = "purple";

function setup(){

  createCanvas (windowWidth-10, windowHeight-15);

  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);

 bow = createSprite(200,370,30,30);
  //bow.shapeColor =("black");
  
   //zoom = createSprite(200, 370,20,20);

   enemyGroup = new Group();
enemyGroup.setRotateToDirectionEach(true);

// zoom.shapeColor=("#06548f");

 tunnel = createSprite(width-50,height-170,100,90);
tunnel.shapeColor = "#FF8C00";

 tunnelUp = createSprite(width-50,height-170-45,100,10);
tunnelUp.shapeColor = "#231c1c";
 tunnelDown = createSprite(width-50,height-130,100,10);
tunnelDown.shapeColor = "#231c1c";


 gate = createSprite(0,0,20,70);
gate.shapeColor = "pink";

 collectableGroup = new Group();
createEdgeSprites();

zoom = createSprite(200, 370,20,20);
zoom.shapeColor=("#06548f");

 bulletGroup = new Group();

}


function draw(){
  
  background("#fff4c2");

  // glowRect(width/4, height/2, 300, 1, 10, color(255, 100));
  // glowRect(width/2+55, height/2, 200, 3, 7, color(27, 42, 97, 100));
  // glowRect(width*3/4, height/2, 100, 6, 10, color(3, 48, 93, 100));
  
  zoom.velocityX=0;
  zoom.velocityY=0;

  if(gameState=="play"){
  
if (keyDown(UP_ARROW)) {
    zoom.velocityY=-9;
  }
  
   if (keyDown(DOWN_ARROW)) {
    zoom.velocityY=8;
  }
  
   if (keyDown(LEFT_ARROW)) {
    zoom.velocityX=-8;
  }
  
  if (keyDown(RIGHT_ARROW)) {
    zoom.velocityX=7;
  }

  spawnEnemy();
  spawnCollectables();

  direction=Math.atan2(zoom.y-200, zoom.x-200)*180/Math.PI  ;
  enemyGroup.setSpeedAndDirectionEach(v, direction);
  enemyGroup.pointToEach(zoom.x, zoom.y);
      
  if(zoom.isTouching(enemyGroup)){
    zoom.rotationSpeed=10;
    zoom.tint = "black";
    
    setTimeout(
      function(){
      zoom.rotationSpeed=0;
      zoom.tint = "orange";
    },2000);

    enemyGroup.bounceOff(gate);
    enemyGroup.bounceOff(tunnelUp);
    enemyGroup.bounceOff(tunnelDown);
    
    zoom.bounce(gate);
    zoom.bounce(tunnelUp);
    zoom.bounce(tunnelDown);

    // enemyGroup.bounceOff(gate);
    // enemyGroup.bounceOff(tunnelUp);
    // enemyGroup.bounceOff(tunnelDown);
    
    // zoom.bounceOff(gate);
    // zoom.bounceOff(tunnelUp);
    // zoom.bounceOff(tunnelDown);
  
  }    
  
  // if (keyDown("space")) {
  //   creat bullet();
  // }


  // bullet function 'key went up'
  if(keyWentUp("space") && World.frameCount>fc){
    shootBullets();
  }

  // if(bulletGroup.isTouching(enemyGroup)){
  //   enemyGroup.destroy();
  // }

  enemyGroup.overlap(bulletGroup,
    function(e,b){
      kill++;
      e.destroy(); 
      b.destroy();
    });

    enemyGroup.bounceOff(gate);
    enemyGroup.bounceOff(tunnelUp);
    enemyGroup.bounceOff(tunnelDown);
    
    zoom.bounce(gate);
    tunnelUp.bounce(zoom);
    tunnelDown.bounce(zoom);
    
    bulletGroup.bounceOff(gate);
    bulletGroup.bounceOff(tunnelUp);
    bulletGroup.bounceOff(tunnelDown);
  
  bow.y = zoom.y;
  bow.x = zoom.x;
  
  drawSprites();
}

function spawnEnemy(){
  
  if(World.frameCount%fc==0){
    
      for(var i=1; i<=eNum; i++){
        var randX = random(120,width-120);
        var randY = random(0,-20);
        var xOffset = random([-9,-7,7,9]);
        var yOffset = random([-15,-10,-9,-7,7,9,10,15]);
        var enemy = createSprite(randX+xOffset,randY+yOffset, 10,10);
        enemy.shapeColor = "#9d1f0a";
        enemy.velocityY = v;
        enemy.lifetime = height/v+20;
        enemyGroup.add(enemy);
      }
      
    eNum = random([3,4,5,6])  ;
  }
}

function shootBullets() {
//   var bullet= createSprite(200,370, 120, 120);
//  //bullet.addImage (bulletImage);
//  bullet.x = zoom.x;
//  bullet.y=bow.y;
//  bullet.velocityX = 4;
//  bullet.lifetime = width/4+10;
//  bullet.scale = 0.08;
//   // bulletGroup.add bullet);
//   return bullet;

var en = enemyGroup.get(enemyGroup.length-2);
if(en){
  var pos = en.position;
  
  var bullet = createSprite(zoom.x,zoom.y,7,7);
  // bullet.setAnimation("bullet");
  // bullet.scale = 0.03;
  
  var dir=(180*Math.atan2(pos.y-200, pos.x-200))/Math.PI;
  //bullet.setRotateToDirection(true);
  bullet.setSpeedAndDirection(v+2, dir);
  bullet.rotationSpeed=20;
  bullet.lifetime = 200;
  bulletGroup.add(bullet);
  bullet.shapeColor = "#4B0082";
}
   
}

function glowRect(x, y, size, depth, blurriness, rectColor){
  noFill();
  stroke(rectColor);
  strokeWeight(size/12);

  glow(rectColor, blurriness);

  for(let i=0; i<depth; i++){
    rect(x, y, size, size, size/10);
  }
}

function glow(glowColor, blurriness){
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = 1;
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}
}

function tunnel1(){
  tunnel.x = 350;
  tunnel.y = 275;
  tunnelUp.x = 350;
  tunnelUp.y = 220;
  tunnelDown.x = 350;
  tunnelDown.y = 330;
  gate.x = 300;
  gate.y = 275;
  
}

function tunnel2(){
  tunnel.x = 50;
  tunnel.y = 275;
  tunnelUp.x = 50;
  tunnelUp.y = 220;
  tunnelDown.x = 50;
  tunnelDown.y = 330;
  //gate.x = 100;
  //gate.y = 275;
}

function spawnCollectables(){
  
  if(World.frameCount%200==0){
    var collectable = createSprite(random(30,World.width-30), random(20,height-20), 15,15);
   // collectable.setAnimation(random(gemsArray));
    collectable.scale = 0.09;
    collectable.shapeColor = "green";
    collectable.lifetime = 200;
    collectableGroup.add(collectable);
  }}
