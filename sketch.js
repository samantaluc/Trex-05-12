var ground, groundImage, invisibleGround; //variavel do chão 28/11
var trex, trex_running, trex_collided; //variavel do trex
var cloud, cloudImage; //variaveis para a nuvem 30/11
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6; 
//variavel para carregar as imagens dos obstaculos 05/12
//---------------------------------------
function preload(){
  //Preload vai carregar arquivos de imagem e som
  trex_running = loadAnimation ("trex1.png" , "trex3.png" , "trex4.png"); //trex correndo
  trex_collided = loadImage ("trex_collided.png"); //trex surpreso pela colisão 28/11
  groundImage = loadImage("ground2.png"); //imagem do chão 28/11
  cloudImage = loadImage("cloud.png"); //imagem da nuvem 30/11
  //imagens para os obstáculos 05/12
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}
//---------------------------------------
function setup(){
  //Setup vai definir as configurações
  createCanvas(600,200); //cria a tela
  //criar o sprite trex
  trex = createSprite(50, 180, 20, 50);
  //adiciona a animação criada no preload
  trex.addAnimation("running", trex_running);
  //definir a escala
  trex.scale = 0.5;
  //definir a posição inicial no eixo horizontal
  trex.x = 50;
  //criar o chão (ground) 28/11
  ground = createSprite(200,180,400,20);
  //adiciona a imagem ao chão 28/11
  ground.addImage("ground",groundImage);
  //a posição x do chão vai ser igual a metade da largura dele, ou seja, 400/2 . 28/11
  ground.x = ground.width /2;
  //a velocidade que o chão se move no eixo x 28/11
  ground.velocityX = -4;
  //criar o chão invisivel para apoiar o trex sem ele flutuar 28/11
  invisibleGround = createSprite(200,190,400,10);
  //visible diz se o sprite irá aparecer. True = aparece. False = não aparece 28/11
  invisibleGround.visible = false;
}
//------------------------------------------
function draw(){
  //Draw vai desenhar na nossa tela
  background("white");
  //pular quando a tecla espaço for pressionada 28/11
  if(keyDown("space") && trex.y >= 100) {
    trex.velocityY = -10;
  }
  //trex voltar ao chão depois do pulo 28/11
  trex.velocityY = trex.velocityY + 0.8
  //impedir que o trex caia 28/11
  trex.collide(invisibleGround);
  //chão volta a posição original quando passa da posição x = 0 (-1,-2,-3...) 30/11
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  //chama a geração de nuvens da function spawnClouds 30/11
  spawnClouds(); 
  //chama a geração de obstaculos 05/12
  spawnObstacles(); 
  drawSprites();
}
//função de gerar nuvens 30/11
function spawnClouds(){
  if(frameCount % 60 === 0){ //gera nuvens nos intervalos 0, 60, 120, 180,...
    //simbolo de % e === indicam o que sobra da divisão
      cloud = createSprite(600,100,40,10);
      cloud.velocityX =-3; 
      cloud.addImage(cloudImage); //adiciona a imagem ao sprite
      cloud.scale = 0.4; 
      cloud.y = Math.round(random(10,60)); 
      //Math.round arredonda os valores
      //random vai gerar em intervalos aleatorios (a,b) 
      //a = intervalo inicial
      //b = intervalo final
      cloud.lifetime = 200; 
      //tempo de vida das nuvens na memória 05/12
      cloud.depth = trex.depth;
      //depth = profundidade 05/12
      trex.depth = trex.depth + 1;
      //trex fica a frente dos sprites de nuvem 05/12
  }
}
//função de gerar obstáculos 05/12
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;
     //gerar obstáculos aleatórios
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;//reinicia a escolha
       case 2: obstacle.addImage(obstacle2);
               break;//reinicia a escolha
       case 3: obstacle.addImage(obstacle3);
               break;//reinicia a escolha
       case 4: obstacle.addImage(obstacle4);
               break;//reinicia a escolha
       case 5: obstacle.addImage(obstacle5);
               break;//reinicia a escolha
       case 6: obstacle.addImage(obstacle6);
               break;//reinicia a escolha
       default: break;
     }
    
     //atribua dimensão e tempo de vida aos obstáculos              
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
  }
 }