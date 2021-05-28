var unitWidth = 20;
var speed = 7;
var unitTime = 1;

function preload(){
    snakeImg = loadImage("images/snake.png");
    bg = loadImage("images/Backdrop.jpg");
    redCherryImg = loadImage("images/Rcherry.png");
    purplecherryImg = loadImage("images/Pcherry.png");
    hiss = loadSound("snakeSound.mp3");
}

function setup(){
    createCanvas(600,600)

    group = createGroup();
    rcherryGroup = createGroup();

    snake = createSprite(200, 200, unitWidth, unitWidth);
    snake.addImage(snakeImg);
    snake.scale = 0.05;
    snake.velocityX = unitWidth;
    
    edges = createEdgeSprites();

    group.add(snake);

    lastTime = 0;

    gameOver = 0;
    score = 0;
}

function draw() {
  background(bg);
  World.frameRate = speed;

  if(!gameOver){
    // if there's a collision with the edges or ourself, we die

    if (edges.isTouching(snake) || group.isTouching(snake)){
      //playSound("sound://category_digital/hop.mp3", false);
      gameOver = 1;
      snake.setSpeedAndDirection(0, 0);
    }
  }

  if(!gameOver){ 
      
    // every unitTime seconds, make the snake longer and increase the score
    //if (World.seconds*10 == (lastTime + unitTime)) {
      //lastTime = World.seconds;
      if(World.frameCount%50===0){
        var rcherry = createSprite(random(50,500),random(50,500), unitWidth, unitWidth);
        rcherry.addImage(redCherryImg);
        rcherry.scale = 0.07;
        rcherryGroup.add(rcherry);
        rcherry.lifetime = 25;
      }

      for(var j =0;j<rcherryGroup.length;j++){
        if(rcherryGroup.isTouching(snake)){
            var sb = createSprite(200,200, unitWidth, unitWidth);
            sb.addImage(snakeImg)
            sb.scale = .05
            rcherryGroup.get(j).destroy()
            group.add(sb);
            score ++;
            speed +=0.2
            hiss.play();
        }
      }
    
    //make each snake block follow the previous one
    for(var i = group.length - 1; i > 0; i--){
      group.get(i).x = group.get(i-1).x;
      group.get(i).y = group.get(i-1).y;
  
    }
  
    // move the sprite  
    if (keyDown("up")) {
       snake.setSpeedAndDirection(unitWidth, -90);
    }
    if (keyDown("down")) {
       snake.setSpeedAndDirection(unitWidth, 90);
    }
    if (keyDown("left")) {
       snake.setSpeedAndDirection(unitWidth, 180);
    }
    if (keyDown("right")) {
       snake.setSpeedAndDirection(unitWidth, 0);
    }
  }
  else {
    fill("red");
    textSize(40);
    text("GAME OVER",100,200);  
  }

  fill("green");
  textSize(25);
  text("SCORE:  " +score,10,30);
    
  drawSprites();
}
