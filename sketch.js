   var monkey,ground,background1,score = 0;

var monkey_img,banana_image,obstacle_image,background_img;

var ObstacleGroup,BananaGroup;

var PLAY, END;
var gameState = PLAY;

function preload(){  
  monkey_img =                             loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_img = loadImage("banana.png");
  
  obstacle_img = loadImage("stone.png");
  
  background_img = loadImage("jungle.jpg");
}
function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(200,200,400,400);
  background1.addImage(background_img);
  background1.velocityX = -8;
  background1.x = background1.width/2;
  
  monkey = createSprite(25,370);
  monkey.addAnimation("running",monkey_img);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200,395,400,10);
  ground.visible = false;
  
  BananaGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() {
  background(220);
  //console.log(monkey.y);
  
  if(gameState === PLAY){
    if(keyDown("space")&&monkey.y >= 334){
    monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if(BananaGroup.isTouching(monkey)){
      BananaGroup.destroyEach();
      score+=10;
    }
    
    switch(score){
      case  10 :  monkey.scale = 0.12;
                break;
      case  20 :  monkey.scale = 0.14;
                break; 
      case  30 :  monkey.scale = 0.16;
                break;
      case  40 : monkey.scale = 0.18;
                break;
      default : break;
    }
    bananas();
    obstacles();
    if(monkey.isTouching(ObstacleGroup)){
      monkey.scale = 0.1;
      score = 0;
    }
    if(monkey.isTouching(ObstacleGroup)&& score === 0){
      gameState = END;
    }
    if(background1.x < 0){
    background1.x = background1.width/2;
  }
  }
  else if(gameState === END){
    background1.velocityX = 0;
    monkey.visible = false;
    BananaGroup.setVelocityXEach = -1;
    ObstacleGroup.setVelocityXEach = -1;
  }
  
  monkey.collide(ground);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :"+score,300,50);
}
function bananas(){
  if(frameCount % 80 === 0){
    var banana = createSprite(400,200,10,10);
    banana.velocityX = -6;
    banana.y = random(200,380);
    banana.addImage(banana_img);
    banana.scale = 0.06;
    banana.lifetime = 70;
    BananaGroup.add(banana);
  }
  
}
function obstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(400,380,10,10);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    obstacle.lifetime = 70;
    obstacle.scale = 0.11;
    ObstacleGroup.add(obstacle);
  }
}