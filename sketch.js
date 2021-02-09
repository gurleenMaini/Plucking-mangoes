
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var boy, tree, rock;
var platform;
var mangoes=[];

function preload()
{
	
}

function setup() {
	createCanvas(1400, 600);


	engine = Engine.create();
	world = engine.world;

	boy = new Boy (250,700,170,230)
	tree = new Tree (1100,900,530,600)
	rock = new Stone (200, 500, 50)
	platform = new Ground (800,600,1600,50)
	launcher = new Launcher(rock.body,{x:200, y: 470});
	createMangoes(10)

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("white");

  boy.display()
  tree.display()
  platform.display()
  rock.display()
  launcher.display() 

  for(i=0;i<mangoes.length;i++){
	  mangoes[i].display()
	  detectCollision(mangoes[i],rock)
  }

}

function mouseDragged(){
	Matter.Body.setPosition(rock.body, {x:mouseX, y:mouseY})
}

function mouseReleased(){
	launcher.fly()
}	

function detectCollision(m,s){
	mangoPosition=m.body.position;
	stonePosition=s.body.position;

	d= dist(mangoPosition.x, mangoPosition.y, stonePosition.x, stonePosition.y);
	if(d<=m.r+s.r){
		Body.setStatic(m.body, false)
	}
}

function createMangoes(n){
	for (i=0;i<n;i++){
		randX=random(900,1300);
		randY=random(150,250);
		mangoes[i]=new Mango (randX, randY, 30);
	}
}

function keyPressed(){
	if (keyCode === 32){
		Body.setPosition(rock.body,{x:200,y:500});
		launcher.attach(rock.body);
	}
}