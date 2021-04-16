 var volcanoImg,bgImage,bridgeImg,dragonImg,fireballImg;
 var idleImg,runningImg,gameState = 0;
var batImg,dieImg;
var fireBallGroup;
 function preload(){
   batImg = loadAnimation("bat1.png","bat2.png","bat3.png");
   dragonImg = loadAnimation("dragon.png");
   bridgeImg = loadImage("bg.png")
   idleImg = loadAnimation("idle.png")
   runningImg = loadAnimation("run1.png","run2.png");
   fireballImg = loadAnimation("fireBall.png");
dieImg = loadAnimation("die1.png","die2.png","die3.png")
 }
function setup() {
  createCanvas(displayWidth - 50,displayHeight - 140);
  fireBallGroup = new Group()
 
  ground = createSprite(displayWidth / 2 - 40,displayHeight - 230,displayWidth - 50,10)
 

  player = createSprite(30,displayHeight - 230)
  player.addAnimation("idle",idleImg);
  player.addAnimation("running",runningImg);
  player.addAnimation("die",dieImg);
  player.scale = 0.2;
  player.debug = true;
player.setCollider("rectangle",0,0,400,500)

enemy = createSprite(displayWidth - 200,displayHeight/2)
enemy.addAnimation("dragon",dragonImg);
enemy.velocityY = 2;
enemy.velocityX = 0.4;
}

function draw() {
  background(bridgeImg);  
  player.collide(ground);
 if(gameState === 0){
  if(keyWentDown("RIGHT_ARROW") ){
    player.velocityX = +2;
    player.changeAnimation("running");
  }
  if(keyWentUp("RIGHT_ARROW") ){
    player.velocityX = 0;
    player.changeAnimation("idle");
  }
  if(keyWentDown("LEFT_ARROW") ){
    player.velocityX = -2;
    player.changeAnimation("running");
  }
  if(keyWentUp("LEFT_ARROW")){
    player.velocityX = 0;
    player.changeAnimation("idle");
  }
  if(keyWentDown("SPACE") ){
    player.velocityY = -10;
    player.changeAnimation("running");
    
  }
  player.velocityY = player.velocityY + 0.8;

  edges=createEdgeSprites()
enemy.bounceOff(edges[2]);
enemy.bounceOff(edges[3]);
enemy.bounceOff(edges[1]);
  drawSprites();
if(frameCount % 200 === 0){
  //SpawnBats();
  SpawnfireBall();
}
if(fireBallGroup.isTouching(player)){
 gameState = 1;
}
 }
 else if(gameState === 1){
  player.changeAnimation("die")
  player.velocityX = 0;
  player.velocityY = 0;
 }
  textSize(25);
  text(mouseX+"-"+mouseY,200,50)
}
function SpawnBats(){
  var bat = createSprite(random(50,displayWidth-100),5,20,20);
 bat.addAnimation("fly",batImg);
 bat.velocityY = +2;
 bat.addAnimation()
 bat.scale = 0.3;

}
function SpawnfireBall(){
  var fireBall = createSprite(enemy.x-150,enemy.y-30);
fireBall.addAnimation("fire",fireballImg);
fireBall.velocityY = +2;
fireBall.velocityX = random(-1,-2);

 fireBall.scale = 0.4;
fireBallGroup.add(fireBall);
}