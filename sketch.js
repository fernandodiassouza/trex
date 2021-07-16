var trex, trex_correndo, trexcolide
    
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;

var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var encerrar=0

var jogar=1

var estadojogo=jogar

var somdosalto, somdamorte


var gameOver, gameOverimg

var reiniciar, reiniciarImage

//1 - CRIAR VARIANTES "reiniciar" e "reiniciarimg"


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
 
trexcolide=loadAnimation("trex_collided.png")
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  somdesalto=loadSound("jump.mp3")
  
  somdemorte=loadSound("die.mp3")
  
  gameOverimg=loadImage("gameOver.png")
  
  reiniciarImage=loadImage("restart.png")
  
  //3 - LOADIMAGE -  "REINICIARIMG"
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  //Adicionar  Nova Animação
  trex.addAnimation("collided",trexcolide);
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
   solo.addImage("ground",imagemdosolo);
   solo.velocityX = -4;  
  
   soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverimg)
  gameOver.scale=0.4
  gameOver.visible=false
  
  
  reiniciar=createSprite(300,140)
  reiniciar.addImage(reiniciarImage)
  reiniciar.scale=0.5
  reiniciar.visible=false
  
  //Criar grupo de Obstaculos  
 grupodeobstaculos=createGroup()
  grupodenuvens=createGroup()
  
  
}

function draw() {
  
  background("blue");
  
  //Faça Isso: Iniciar o Estado do Jogo
  if(estadojogo===jogar){
  

    //Saltar quando a tecla de espaço é pressionada
    if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
      somdesalto.play()
  }
    
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
    
     if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
   //evita que o Trex caia no solo
  trex.collide(soloinvisivel);
    
   //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();

  // Grupo de Nuvens Toca no Trex o Jogo se Encerra
if(grupodeobstaculos.isTouching(trex)){
  estadojogo=encerrar
  somdemorte.play()
} 
  } 
  
// Faça Isso: Quando estado do Jogo for Encerrar a velocidade do solo e do Trex sera 0
 if(estadojogo===encerrar){
   solo.velocityX=0
   trex.velocityY=0
   
   gameOver.visible=true
   reiniciar.visible=true
   
   
   trex.changeAnimation("collided",trexcolide)
   
  grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
   
   
   //5 - IF: FAÇA ISSO - PRESSIONAR O MOUSE PARA REINICIAR
   
   if(mousePressedOver(reiniciar)){
    reset() 
     
   }
   
   
   
 }
  
  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(400,165,10,40);
  obstaculo.velocityX = -6;
    obstaculo.scale = 0.5;
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    
    grupodeobstaculos.add(obstaculo);
   
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
    
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
   grupodenuvens.add(nuvem)
    
  }
}


function reset(){
  
  estadojogo=jogar
  gameOver.visible=false
  reiniciar.visible=false
  grupodeobstaculos.destroyEach()
  grupodenuvens.destroyEach()
}

