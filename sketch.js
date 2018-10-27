var assetPath='./assets/';
//var scaleValue = 0.35;
var monsterData;
var enemy;
var monsterParty=[];
var monsterPartySize = 3;
var test;
var monsterStartX = 50;
var monsterX = [50, 250, 450];
var monsterY = 500;
var partyGraphic = [];

var selecting = false;
var target;



function preload(){
  monsterData=loadJSON('assets/dragon_quest.json');
  wallpaper=loadImage('./assets/Battleback_plains_a.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //CICLO PER I TRE MOSTRI CHE VISUALIZZO
  for(var i=0; i<monsterPartySize; i++){
    //ENEMYINDEX MI INDICA UN MOSTRO A CASO NELL'ARRAY DI MOSTRI, INDIPENDENTEMENTE DAL FOR
    //IL SUO VALORE VA DA 0 ALLA LUNGHEZZA DI MONSTERS(L'ARRAY NEL JSON)
    var enemyIndex= floor(random(0, monsterData.monsters.length-0.1));
    //CREO UN ARRAY CON LE IMMAGINI (NON SI RIUSCIVA A FARE IL LOAD NELLA MONSTER FUNCTION)
    partyGraphic[i] = loadImage(assetPath + monsterData.monsters[enemyIndex].graphics.fileName);
    //MONSTERPARTY SONO I MOSTRI CHE VISUALIZZO
    var m = new Monster(i, enemyIndex);
    monsterParty.push(m);
  }
}

function draw() {
  image(wallpaper, 0, 0);

  //monsterParty[0].x = 550;
  //monsterParty[0].y = 550;

  //FOR CHE SERVE A DISEGNARE EFFETIVAMENTE I MOSTRI
  for(var i=0; i<monsterPartySize; i++){
    monsterParty[i].x=50+400*i;
    monsterParty[i].y=50;
    monsterParty[i].display();
    //CONTROLLO SE IL MOUSE È SU UN MOSTRO
    monsterParty[i].checkMouseOver();
  }
}

function Monster(partyIndex, dataIndex) {
  var pIndex = partyIndex;
  var dIndex = dataIndex;
  var img = partyGraphic[pIndex];
  var currentHp;

  this.display = function() {
    //this.x=50;
    //this.y=50
    image(img, this.x, this.y);

    push();
    textSize(60);
    text(monsterData.monsters[dIndex].info.name, this.x, this.y + 400); //da vedere con altezza img
    pop();
  }
  this.checkMouseOver = function() {
    //PINDEX MI SERVE PER ACCEDERE ALL'ARRAY DELLE GRAFICHE CHE È PARALLELO A QUELLO DEI MOSTRI DISEGNATI
    if(mouseX>this.x &&
      mouseX<this.x+partyGraphic[pIndex].width &&
      mouseY>this.y &&
      mouseY<this.y+partyGraphic[pIndex].height) {

        fill(0,0,0);
        var statWindowY=this.y+450;
        push();
        rect(this.x, statWindowY, 400, 200);
        textSize(50);
        fill(255);
        text('HP: ' + monsterData.monsters[dIndex].stats.HP, this.x+20, statWindowY+20);
        pop();
      }
    }
}
