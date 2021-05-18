var dog,happyDog,database,foodS,foodStock;
var dog_img,happyDog_img;
var feed,addfood;
var fedTime,lastFed;
var foodObj;
var input,button,greeting;
var database;

function preload(){
  dog_img=loadImage("images/dogImg.png");
  happyDog_img=loadImage("images/dogImg1.png");
}

function setup(){
  database=firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  createCanvas(1000,400);

  dog=createSprite(800,200);
  dog.addImage(dog_img);
  dog.scale=0.2;

  foodObj=new food();

  feed=createButton("Feed the Dog");
  feed.position(1000,67);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(1100,67);
  addFood.mousePressed(addFoods);
}
 
function draw(){
  background(46, 139, 87);

  foodObj.display();  

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  }
  else if(lastFed===0){
    text("Last Feed : 12 AM",350,30)
  }
  else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  drawSprites();
}

function readStock(data){ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
  
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}