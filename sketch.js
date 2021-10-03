var bossImage,grayShipImage,lightBlueShipImage,redShipImage,whiteShipImage,yellowAndBlackShipImage,spaceImage,fireballImage,shootSound
var playerShip
var edges
var score = 0
var enemyShips,gameoverImage


var keyPressed = false
var fireballGroup
var gameState = "PLAY"
function preload(){
bossImage = loadImage("images/Boss.png")
grayShipImage = loadImage("images/GrayShip.png")
lightBlueShipImage = loadImage("images/LightBlueShip.png")
redShipImage = loadImage("images/red.png")
whiteShipImage = loadImage("images/WhiteShip.png")
yellowAndBlackShipImage = loadImage("images/YellowAndBlack.png")
spaceImage = loadImage("images/space.png")
fireballImage = loadImage("images/fireBall.png")
gameoverImage = loadImage("images/gameover.png")

shootSound = loadSound("sounds/shooting.wav")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  playerShip = createSprite(windowWidth/2,windowHeight-100,20,50);
  playerShip.addImage(whiteShipImage)
  playerShip.scale = 0.5
  

  edges = createEdgeSprites()
  
  enemyShips = new Group()
  fireballGroup = new Group()
}

function draw(){
 background(spaceImage)

 if(gameState === "PLAY")
 {
  if(keyDown("w")){
    playerShip.y = playerShip.y-15
  }
  if(keyDown("s")){
   playerShip.y = playerShip.y+15
  }
  if(keyDown("a")){
   playerShip.x = playerShip.x-15
  }
  if(keyDown("d")){
   playerShip.x = playerShip.x+15
  }
  playerShip.collide(edges)
  
  
  
  
  if(enemyShips.isTouching(fireballGroup))
  {
    for(var i = 0;i<enemyShips.length;i++)
    {
      if(fireballGroup.isTouching(enemyShips[i]))
      {
        enemyShips[i].destroy()
        score = score+1
      }
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  createEnemies()
  
  
  
  drawSprites()
 
  fill("white")
 
  text("Score: "+score, windowWidth-100,40)
 if(enemyShips.isTouching(playerShip)|| enemyShips.isTouching(edges[3]))

 {
gameState = "END"   
 }

 }
 if(gameState === "END")
background(gameoverImage) 
}

function shoot (){
  
  setTimeout(function() {
    fireball = createSprite(playerShip.x,playerShip.y)
  fireball.addImage(fireballImage)
  fireball.scale = 0.1
  fireball.velocityY = -6
  fireballGroup.add(fireball)
  shootSound.play()

  });
  
}
function keyPressed()
{
  console.log("here")
  if(keyCode === 32)
  {
    
    shoot()
  }
}
function keyReleased()
{
  if(keyCode === 32){
  console.log("yes")
  shoot();}
}
function createEnemies()
{
  if(frameCount%40===0)
  {
    enemy = createSprite(40,0)
    enemy.x = Math.round(random(0,windowWidth-100))
    enemy.velocityY = 4
    var img = Math.round(random(1,4))
    enemy.scale =0.5
    
    if(img === 1)
    {
      enemy.addImage(grayShipImage)
    }
    if(img === 2)
    {
      enemy.addImage(redShipImage)
    }
    if(img === 3)
    {
      enemy.addImage(lightBlueShipImage)
    }
    if(img === 4)
    {
      enemy.addImage(yellowAndBlackShipImage)
    }
    enemyShips.add(enemy)
  }
}
