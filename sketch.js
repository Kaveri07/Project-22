//images
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//all image preloads
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	//making the rect positions start from center
	rectMode(CENTER);

	//creating sprite from which packageBody will get positions from
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	//helicoptor
	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	//ground
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor= "brown";

	//defining engine and world
	engine = Engine.create();
	world = engine.world;

	//creating packageBody as a circle, giving restitution, making static, and adding to world as a body
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	
	//Creating a sturdy ground and adding it to world
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	//running engine
	Engine.run(engine);
}

function draw() {
  
	//making rect position start from center
	rectMode(CENTER);
	
	//background
	background(0);
	
	//engine update
	Engine.update(engine);
	
	//making packageBody positions same as sprite
	packageSprite.x= packageBody.position.x;
  	packageSprite.y= packageBody.position.y; 
	
	//calling functions
	keyPressed();
  	drawSprites();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    Matter.Body.setStatic(packageBody, false)
  }
}