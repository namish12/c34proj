const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var weight;
var rabbit;

var button;
var zombie;

var flag

function preload()
{
  bg_img = loadImage('background.png');
  weight = loadImage('weightimg.png');
  zombieImg = loadImage('zombie.png');
  flagImg = loadImage('flag.png')
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);


  zombie = createSprite(500,580,100,100);
  zombie.addImage('running',zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -1;

  flag = createSprite(50,580,100,100);
  flag.addImage('end',flagImg);
  flag.scale = 0.5;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit != null){
    image(weight,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,zombie)==true)
  {
    console.log("You Won!!");
    World.remove(engine.world, zombie);
    zombie.velocityX = 0;
  }

  if(collide(flag,zombie)==true)
  {
    console.log("You lost!");
  }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function keyPressed(){
  if(keyCode == LEFT_ARROW){
    airblow2();
  }
  if(keyCode == RIGHT_ARROW){
    airblow();
  }
}

function collide(body,sprite){
  if(body != null){
    var b = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(b <= 80){
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit, {x : 0, y : 0}, {x : 0.01, y : 0});
  air.play();
}

function airblow2(){
  Matter.Body.applyForce(fruit, {x : 0, y : 0}, {x : -0.01, y : 0});
  air.play();
}