var ground, groundImage, invisibleGround; //variavel do chão 28/11

var trex, trex_running, trex_collided; //variavel do trex

var cloud, cloudImage; //variaveis para a nuvem 30/11

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6; 
//variavel para carregar as imagens dos obstaculos 05/12

var score; //variavel para a pontuação 07/12

var PLAY = 1; //variavel do jogo no estado de Jogar com valor para troca (switch) 07/12

var END = 0; //variavel do jogo no estado de Final com valor para troca (switch) 07/12

var gamestate = PLAY; //variavel de Estado de Jogo, sendo a inicial de Jogar 07/12

var obstacles; //variavel para obstaculos (grupo) 07/12

var clouds; //variavel para nuvens (grupo) 07/12

var gameOver, restart; //variavel para Fim de Jogo e Reiniciar 12/12

var gameOverImg, restartImg; //variavel para imagem de Game Over e Reiniciar 12/12
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

  //imagens para reiniciar e game over 12/12
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
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

  //pontuação inicia em 0 12/12
  score = 0;

  //cria os grupos de obstaculos e nuvens 12/12
  clouds = new Group();
  obstacles = new Group();

  //cria o sprite de Fim de Jogo 12/12
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  //cria o sprite de Reiniciar 12/12
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;

//verifica se o trex encostou no obstaculo 12/12
  trex.setCollider("circle",0,0,40); 
  
  trex.debug = false;
  //se False, não exibe o modelo de distancia de colisao 12/12
  //se True, exibe o modelo de distancia de colisao 12/12
}
//------------------------------------------
function draw(){
  //Draw vai desenhar na nossa tela
  background("white");
  //----------ESTADO DE JOGO JOGAR(PLAY)-----------
  if (gamestate === PLAY){ //estado de JOGAR
      //calcula a pontuação dividindo o total de frames gerados por 60 07/12
    score = score + Math.round(frameCount/60);
      //pular quando a tecla espaço for pressionada 28/11 E 07/12
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
     }
      //trex voltar ao chão depois do pulo 28/11 E 07/12
    trex.velocityY = trex.velocityY + 0.8
      //impedir que o trex caia 28/11
    trex.collide(invisibleGround);
      //chão volta a posição original quando passa da posição x = 0 (-1,-2,-3...) 30/11 E 07/12
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      //chama a geração de nuvens da function spawnClouds 30/11  E 07/12
    spawnClouds(); 
      //chama a geração de obstaculos 05/12 E 07/12
    spawnObstacles(); 
    //
      //se os obstaculos tocarem o trex, o jogo acaba 12/12
    if(obstacles.isTouching(trex))
        { 
          gamestate = END; // mudar o estado de jogo para Final
        }

    gameOver.visible = false; //não tem visibilidade da imagem de GameOver 12/12
    restart.visible = false; //não tem visibilidade da imagem de Restart 12/12
  }
  //----------ESTADO DE JOGO FINAL(END)-----------
  else if (gamestate === END) { //estado de FINAL 07/12
      ground.velocityX=0; //movimento do chão parado 07/12

      trex.velocityY = 0;//MOVIMENTO DO TREX PARADO 07/12

      //mudar a animação do trex para colidiu 07/12
        trex.changeAnimation("collide", trex_collided);

      gameOver.visible = true; //visibilidade da imagem de GameOver 12/12
      restart.visible = true; //visibilidade da imagem de Restart 12/12

      //definir tempo de vida aos objetos do jogo para que nunca sejam destruídos 12/12
       obstacles.setLifetimeEach(-1);
        clouds.setLifetimeEach(-1);

     //definir velocidade aos objetos do jogo para que nunca de movam 12/12
       obstacles.setVelocityXEach(0);
       clouds.setVelocityXEach(0);
  }
  
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
      clouds.add(cloud);
      //adiciona as nuvens ao grupo de nuvem 12/12
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
     //adiciona os obstáculos ao grupo de obstáculos 12/12
     obstacles.add(obstacle);
  }
 }
