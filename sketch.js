//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
function preload() {
  //load images here
  dogImg = loadImage("image/dogImg.png");
  happyDogImg = loadImage("image/dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(200, 300, 10, 60);
  dog.addImage(dogImg);
}

function draw() {
  background(46, 139, 87);

  textSize(20);
  fill(255);
  text("PRESS UP ARROW TO FEED DRAGO MILK", 60, 60);
  text("Food Left: " + foodS, 150, 150);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if (keyWentUp(UP_ARROW)) {
    dog.addImage(dogImg);
  }

  if (foodS === 0) {
    foodS = 20;
  }

  drawSprites();
  //add styles here
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    food: x,
  });
}
