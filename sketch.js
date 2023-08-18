/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;


var canyon_xpos;
var canyon_width;


var collectable_xpos;
var collectable_ypos;
var collectable_size;
var collectable_isFound;
var collectables;

var anchor_points_x;
var anchor_points_y;

var trees_x;
var treePos_y;

var clouds_xpos;
var clouds_ypos;
var cloud_size;

var mountain_xpos;
var mountain_ypos;

var ScrollPos;
var game_score;
var flagpole;
var lives;

var platforms

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    gameChar_world_x =gameChar_x;
    //setupScene();//call the setupScene in scene.js
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    collectables = [{xpos:50,ypos:405,size:50,isFound:false},
                   {xpos:300,ypos:405, size:50,isFound: false},
                   {xpos:600,ypos: 405, size:50,isFound: false},
                   {xpos:900,ypos: 405, size:50,isFound:false}];

    
    canyons = [{xpos:0,width:100},
              {xpos:400,width:100},
              {xpos:800,width:100},
              {xpos:1200,width:100}];
    
    trees_x = [300, 500, 900, 1150];
    treePos_y = height/2;
    
    clouds_xpos = [50,200,500,700];
    clouds_ypos = [100, 250, 220, 150];
    cloud_size = 60;
    
    mountain_xpos = [150, 0, 300, 500];
    mountain_ypos = 432;
    
    ScrollPos = 0;
    
    game_score = 0;
    
    flagpole = {x_pos: 2000, isReached: false};
    
    lives = [{damaged:false,xpos:860,invulnerability:true}, 
          {damaged:false,xpos:910,invulnerability:true}, 
          {damaged:false,xpos:960,invulnerability:false}]; 
    
    enemies=[{xpos:1400,ypos:floorPos_y,render:false,acceleration:0,flying:false,gameover:false}, 
    {xpos:1000,ypos:floorPos_y,render:false,acceleration:0,flying:true,gameover:false},
    {xpos:700,ypos:floorPos_y,render:false,acceleration:0,flying:true,gameover:false}];
    
    platforms=[{xpos:1200 ,ypos:floorPos_y - 45, width:100, standing:false},
              {xpos:500 ,ypos:floorPos_y - 45, width:100, standing:false}];
}

function draw()
{
     
    ScrollPos = gameChar_world_x - width/2;
	///////////DRAWING CODE//////////

	background(210,246,247); //fill the sky blue
    
    noStroke();
	fill(0,102,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    // scrolling 
    push();
    translate(-ScrollPos, 0);
    
    for(var i = 0; i < collectables.length; i++)
    {
        if(!collectables[i].isFound)
        {
            collectableDraw(collectables[i]);
            collectablecheck(collectables[i]);
        }
    }
    

   
    renderPlatform();

    //mountains drawing 
    for(var i = 0; i < mountain_xpos.length; i++){
        fill(195, 186, 204);
        triangle(mountain_xpos[i] + 70, mountain_ypos, mountain_xpos[i] + 310, mountain_ypos - 250, mountain_xpos[i] + 550 , mountain_ypos);

        fill(204, 229, 255);
        triangle(mountain_xpos[i] + 260, mountain_ypos - 200, mountain_xpos[i] + 310, mountain_ypos - 250, mountain_xpos[i] + 360, mountain_ypos - 200);

    }
    // mountains anchor points
    fill(255, 0, 0);
    ellipse(292, 350, 13, 13);
    ellipse(455, 350, 13, 13);
    ellipse(615, 350, 13, 13);
    ellipse(814, 350, 13, 13);
 
    
    //clouds drawing
    
    for(var i = 0; i < clouds_ypos.length; i++){
        fill(255, 255, 255);
        //ellipse(200, 100, 80, 80);
        ellipse(clouds_xpos[i] + 100, clouds_ypos[i] , cloud_size + 20);

        //ellipse(160, 100, 60, 60);
        ellipse(clouds_xpos[i] + 60, clouds_ypos[i] , cloud_size);

        //ellipse(240, 100, 60, 60);
        ellipse(clouds_xpos[i] + 140, clouds_ypos[i] , cloud_size);
        
        fill(255, 0, 0);
        ellipse(clouds_xpos[i] + 100, clouds_ypos[i], 13, 13);
    }
    // clouds animation
    animateclouds();
    function animateclouds(){
    clouds_xpos[0] = clouds_xpos[0] + 1;
    clouds_xpos[1] = clouds_xpos[1] + 1;
    clouds_xpos[2] = clouds_xpos[2] + 1;
    clouds_xpos[3] = clouds_xpos[3] + 1;
}

    
    // trees drawing 
    for(var i = 0; i < trees_x.length; i++){
        fill(145, 98, 3);
        //rect(850, 282, 60, 150);
        rect(trees_x[i], treePos_y, 60, 150);

        fill(87, 110, 29);
        //triangle(800, 350, 880, 240, 960, 350);
        triangle(trees_x[i] - 50, treePos_y + 68, trees_x[i] + 30, treePos_y - 42, trees_x[i] + 110, treePos_y + 68);

        //triangle(800, 300, 880, 190, 960, 300);
        triangle(trees_x[i] - 50, treePos_y + 18, trees_x[i] + 30, treePos_y - 92, trees_x[i] + 110, treePos_y + 18);

        fill(255, 255, 255);
        triangle(trees_x[i], treePos_y - 50, trees_x[i] + 30, treePos_y - 92, trees_x[i] + 60, treePos_y - 50);


        // christmas lights
        fill(255, 102, 102);
        //ellipse(900, 350, 20, 20);
        ellipse(trees_x[i] + 50, treePos_y + 68, 20, 20);

        //ellipse(840, 250, 20, 20);
        ellipse(trees_x[i] - 10, treePos_y - 32, 20, 20);

        //ellipse(945, 300, 20, 20);
        ellipse(trees_x[i] + 95, treePos_y + 18, 20, 20);

        fill(255, 255, 153);
        //ellipse(830, 347, 15, 15);
        ellipse(trees_x[i] - 20, treePos_y + 65, 15, 15);
        //ellipse(900, 220, 15, 15);
        ellipse(trees_x[i] + 50, treePos_y - 62, 15, 15)
        fill(153, 4153 , 255);
        //ellipse(900, 270, 15, 15);
        ellipse(trees_x[i] + 50, treePos_y + 12, 15, 15);
        //ellipse(840, 310, 15, 15);
        ellipse(trees_x[i] - 10, treePos_y + 28, 15, 15);
        fill(204, 153, 255); 
        //ellipse(890, 315, 20, 20);
        ellipse(trees_x[i] + 40, treePos_y + 33, 20, 20)
        //ellipse(860, 280, 17, 17);
        ellipse(trees_x[i] + 10, treePos_y - 2, 17, 17);
    }
    
    //trees anchor points
    fill (255, 0, 0);
    ellipse(330, 400, 13, 13);
    ellipse(530, 400, 13, 13);
    ellipse(930, 400, 13, 13);
    
    
    
    collectablesDraw();

    canyonsDraw();
    // canyon anchor point
    fill(255, 0, 0);
    ellipse(0, 435, 13, 13);
    ellipse(400, 435, 13, 13);
    ellipse(800, 435, 13, 13);
    ellipse(1200, 435, 13, 13);
    
   

   

    renderFlagpole();
    
    renderEnemy();
    
    pop();
    
    fill(255);
    noStroke();
    textSize(30);
    text("Score: " + game_score, 20,40);
    
    

	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        
    fill(227, 180, 72);
    ellipse(gameChar_x, gameChar_y - 62, 17, 25);
    
    fill(204, 209, 143);
    rect(gameChar_x - 7, gameChar_y - 50, 14, 45);
    
    fill(58, 107, 53);
    rect(gameChar_x - 10, gameChar_y - 8, 4, 6);
    
    fill(227, 180, 53);
    rect(gameChar_x - 13, gameChar_y - 42, 15, 5);
    
    fill(250, 16,7)
    triangle(gameChar_x + 200, gameChar_y + 250, gameChar_x + 200);

    

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        
    fill(227, 180, 72);
    ellipse(gameChar_x, gameChar_y - 62, 17, 25);
    
    fill(204, 209, 143);
    rect(gameChar_x - 7, gameChar_y - 50, 14, 45);
    
    fill(58, 107, 53);
    rect(gameChar_x + 4, gameChar_y - 8, 4, 6);

    fill(227, 180, 72);
    rect(gameChar_x - 3, gameChar_y - 42, 15, 5);
        
    fill(250, 16,7)
    triangle(gameChar_x + 200, gameChar_y + 250, gameChar_x + 200);



	}
	else if(isLeft)
	{
		// add your walking left code
        
    fill(227, 180, 72);
    ellipse(gameChar_x, gameChar_y - 57, 17, 25);
    
    fill(204, 209, 143);
    rect(gameChar_x - 7, gameChar_y - 45, 14, 45);
    
    fill(58, 107, 53);
    rect(gameChar_x - 10, gameChar_y - 3, 4, 6);

    fill(227, 180, 72);
    rect(gameChar_x - 3, gameChar_y - 42, 5, 20);
        
    fill(250, 16,7)
    triangle(gameChar_x + 200, gameChar_y + 250, gameChar_x + 200);


	}
	else if(isRight)
	{
		// add your walking right code
        
    fill(227, 180, 72);
    ellipse(gameChar_x, gameChar_y - 57, 17, 25);
    
    fill(204, 209, 143);
    rect(gameChar_x - 7, gameChar_y - 45, 14, 45);
    
    fill(58, 107, 53);
    rect(gameChar_x + 4, gameChar_y - 3, 4 ,6);
    
    fill(227, 180, 72);
    rect(gameChar_x - 3, gameChar_y - 42, 5, 20);

    fill(250, 16,7)
    triangle(gameChar_x + 200, gameChar_y + 250, gameChar_x + 200);


	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        
    fill(227, 180, 72);
    ellipse(gameChar_x, gameChar_y - 62, 25);
    
    fill(204, 209, 143);
    rect(gameChar_x - 10 , gameChar_y - 50, 20, 45)

    fill(58, 107, 53);
    rect(gameChar_x + 6, gameChar_y - 7, 6, 6);
    rect(gameChar_x - 12, gameChar_y - 7, 6, 6);
    
    fill(227, 180, 72);
    rect(gameChar_x - 25, gameChar_y - 42, 15, 5);
    rect(gameChar_x + 10, gameChar_y - 42, 15, 5);
    
        




	}
	else
	{
    // add your standing front facing code
        
    fill(227, 180, 72);
    ellipse(gameChar_x, gameChar_y - 57, 25);
    
    fill(204, 209, 143);
    rect(gameChar_x - 10,gameChar_y - 45, 20, 45);
    
    fill(58, 107, 53);
    rect(gameChar_x + 6, gameChar_y - 3, 6, 6);
    rect(gameChar_x - 12, gameChar_y - 3, 6, 6);
    
    fill(227, 180, 72);
    rect(gameChar_x - 15, gameChar_y - 42, 5, 20);
    rect(gameChar_x + 10, gameChar_y - 42, 5, 20);
        
         
//    // santa hat 
//    fill(250, 16,7);
//    ellipse(400, 300, 25,25);

	}
   
    // game character anchor point
    fill(255, 0, 0);
    ellipse(gameChar_x, gameChar_y, 13, 13);
    

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    for(i=0;i<platforms.length;i++){
        if(gameChar_y <= floorPos_y && isFalling == false && platforms[i].standing==false){
            gameChar_y += 1;
            isFalling = true;
        }else if(gameChar_y != floorPos_y){
            isFalling = false;
        }
    }
    
    
    if(isLeft == true && isPlummeting == false && enemies[0].gameover == false){
        gameChar_world_x -=5;

    }
    else if(isRight == true && isPlummeting == false && enemies[0].gameover == false){
        gameChar_world_x +=5;

    }
    
    canyoncheckstart();
    collectablecheckstart();
    takenDamage();
    drawLives();
    checkGameover();
    checkEnemyInRange();
    moveEnemy();
    enemyTouch();
    standingPlatform();
    
    
    if(flagpole.isReached == false)
    {
        checkFlagpole();
        
    }
    
    
        

}
    
function keyPressed() 
{
	// if statements to control the animation of the character when
	// keys are pressed.

    
    if(keyCode == 37){
        isLeft = true;
    }
    else if(keyCode == 39){
        isRight = true;
    }
    else if(keyCode == 38){
        if(gameChar_y >= floorPos_y && enemies[0].gameover == false){
            gameChar_y -= 75;
        }
    }
    
    if (keyCode == 37) {
        document.getElementById('audio').play();
    }
    if (keyCode == 38) {
        document.getElementById('audio').play();
    }
    if (keyCode == 39) {
        document.getElementById('audio').play();
    }
    if(keyCode == 82){
        setup();
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(keyCode == 37){
        isLeft = false;
    }else if(keyCode == 39){
        isRight = false;
    }
}

function collectablesDraw(){
    collectableDraw(collectables[0]);
    collectableDraw(collectables[1]);
    collectableDraw(collectables[2]);
    collectableDraw(collectables[3]);
}

function collectableDraw(t_collectables){
    if(t_collectables.isFound == false){
    fill(153, 0, 0); 
         triangle(t_collectables.xpos , t_collectables.ypos, t_collectables.xpos + 20, t_collectables.ypos - 35, t_collectables.xpos + 40, t_collectables.ypos);
    
         triangle(t_collectables.xpos, t_collectables.ypos, t_collectables.xpos + 20, t_collectables.ypos + 27, t_collectables.xpos + 40, t_collectables.ypos);
        
         // collectables anchor points
        fill(255, 0, 0);
        ellipse(t_collectables.xpos + 20, 405, 13, 13);
        ellipse(t_collectables.xpos + 20, 405, 13, 13);
        ellipse(t_collectables.xpos + 20, 405, 13, 13);
        ellipse(t_collectables.xpos + 20, 405, 13, 13);
        
        
        
    }
    
}


function collectablecheckstart(){
    collectablecheck(collectables[0]);
    collectablecheck(collectables[1]);
    collectablecheck(collectables[2]);
    collectablecheck(collectables[3]);
}

function collectablecheck(t_collectable){
    
    if( dist(gameChar_world_x, gameChar_y, 
    t_collectable.xpos, t_collectable.ypos) < 50 && t_collectable.isFound==false)
    {
        game_score += 1;
        t_collectable.isFound = true;

        
       
    }
    
}

function canyonsDraw(){
    canyonDraw(canyons[0]);
    canyonDraw(canyons[1]);
    canyonDraw(canyons[2]);
    canyonDraw(canyons[3]);
}

function canyonDraw(t_canyon){
    fill(145, 98, 3);
    rect(t_canyon.xpos , floorPos_y, t_canyon.width - 40, 144);
}

function canyoncheckstart(){
    canyoncheck(canyons[0]);
    canyoncheck(canyons[1]);
    canyoncheck(canyons[2]);
    canyoncheck(canyons[3]);
}

function canyoncheck(t_canyon)
{
    if( gameChar_world_x > t_canyon.xpos && gameChar_world_x < t_canyon.xpos + 60 && gameChar_y >= floorPos_y){
        gameChar_y += 10;
        isPlummeting = true;
    }
}
function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255, 0, 255);
    noStroke();
    
    if(flagpole.isReached)
    {
        rect(flagpole.x_pos, floorPos_y - 250,50 ,50);  
    }
    else
    {
        rect(flagpole.x_pos, floorPos_y - 50, 50 , 50);
    }
    pop();
    
}
function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos)
    
    if(d < 15)
    {
        flagpole.isReached = true;
    }
}

function drawLives(){ 
    console.log(lives)
    if(lives[0].damaged == true){ 
        fill(255,0,0); 
    }else if (lives[1].damaged == true){ 
        fill(255,255,0); 
    }else{ 
        fill(0,255,0); 
    } 
    textSize(27); 
    text("Lives:",765,40); 
    for(i=0;i<lives.length;i++){ 
        if(lives[i].damaged == false){ 
            rect(lives[i].xpos,10,40,40); 
        } 
    } 
} 


function takenDamage(){ 
    if(gameChar_y >= 576){
        if(lives[2].damaged==false){ 
            gameChar_world_x = width/2 - 100; 
            gameChar_y = floorPos_y - 20; 
            isPlummeting = false; 
            lives[2].damaged=true;
            lives[1].invulnerability=false;
        } else if(lives[1].damaged==false){ 
            gameChar_world_x = width/2 - 100; 
            gameChar_y = floorPos_y - 20; 
            isPlummeting = false; 
            lives[1].damaged=true;
            lives[0].invulnerability=false;
        } else if(lives[0].damaged==false){ 
            lives[0].damaged=true; 
        } 
         
    } 
} 

function checkGameover(){ 
    if(lives[0].damaged == true){ 
        background(0); 
        textSize(100); 
        fill(255,0,0); 
        text("GAME OVER",width/5,height/2); 
    } 
    if(lives[0].damaged==false && dist(flagpole.x_pos,floorPos_y,gameChar_world_x,gameChar_y)<20){
        for(i=0;i<enemies.length;i++){ 
            enemies[i].gameover = true; 
        } 
        textSize(100); 
        fill(0,255,0); 
        text("YOU WIN",width/5,height/2); 
    } 
} 


function renderEnemy(){ 
    fill(173,216,230) 
    for(i=0;i<enemies.length;i++)
    { 
        ellipse(enemies[i].xpos,enemies[i].ypos - 15, 20); 
    } 
} 

function checkEnemyInRange(){
    for(i=0;i<enemies.length;i++){ 
        var negative = abs(enemies[i].xpos - gameChar_world_x);//distance 
        var positive = abs(enemies[i].xpos + gameChar_world_x); 
        if(negative < width/2 && positive > 0){ 
            enemies[i].render=true; 
        } else{ 
            enemies[i].render=false; 
        } 
    } 
} 
function moveEnemy(){ 
    for(i=0;i<enemies.length;i++){ 
        if(enemies[i].gameover==true){ 
           enemies[i].acceleration=0; 
        } else if(enemies[i].render==true){ 
            if(enemies[i].flying==false && enemies[i].gameover == false){ 
                enemies[i].acceleration=0.3; 
            } 
            else if(enemies[i].flying==true && enemies[i].gameover == false){ 
                enemies[i].acceleration=0.5; 
            } 
        } else if (enemies[i].render==false){ 
            enemies[i].acceleration=0; 
        } 
        for(p=0;p<canyons.length;p++){ 
            if(enemies[i].xpos > gameChar_world_x){ 
                enemies[i].xpos -= enemies[i].acceleration; 
            } else if(enemies[i].xpos < gameChar_world_x){ 
                enemies[i].xpos += enemies[i].acceleration; 
            } 
            var d = abs(enemies[i].xpos - canyons[p].xpos); 
            if(d < 100 && enemies[i].ypos == floorPos_y && enemies[i].flying == false){
                enemies[i].ypos = enemies[i].ypos - 50; 
            } 
        } 
        if(enemies[i].ypos < floorPos_y){ 
            enemies[i].ypos = enemies[i].ypos + 1; 
        } 
    } 
} 
function enemyTouch(){ 
    for(i=0;i<enemies.length;i++){ 
        var d = dist(enemies[i].xpos,enemies[i].ypos,gameChar_world_x,gameChar_y); 
        if(d < 5){ 
            if(lives[2].damaged==false){ 
                if(enemies[i].xpos > gameChar_world_x){ 
                    enemies[i].xpos = enemies[i].xpos + 100; 
                } 
                if(enemies[i].xpos < gameChar_world_x){ 
                    enemies[i].xpos = enemies[i].xpos - 100; 
                } 
                lives[2].damaged=true; 
                lives[1].invulnerability=false; 
            } else if(lives[1].damaged==false && lives[1].invulnerability==false){ 
                if(enemies[i].xpos < gameChar_world_x){ 
                    enemies[i].xpos = enemies[i].xpos + 100; 
                } 
                if(enemies[i].xpos > gameChar_world_x){ 
                    enemies[i].xpos = enemies[i].xpos - 100; 
                }

lives[1].damaged=true; 
                lives[0].invulnerability=false; 
            } else if(lives[0].damaged==false && lives[0].invulnerability==false){ 
                if(enemies[i].xpos < gameChar_world_x){ 
                    enemies[i].xpos = enemies[i].xpos + 100; 
                } 
                if(enemies[i].xpos > gameChar_world_x){ 
                    enemies[i].xpos = enemies[i].xpos - 100; 
                } 
                lives[0].damaged=true; 
            } 
        } 
    } 
}


function renderPlatform(){ 
    for(i=0;i<platforms.length;i++){ 
        fill(165,42,42); 
        rect(platforms[i].xpos,platforms[i].ypos,platforms[i].width,10) 
    } 
} 
function standingPlatform(){ 
    for(i=0;i<platforms.length;i++){ 
        if(gameChar_world_x > platforms[i].xpos && gameChar_world_x < platforms[i].xpos + platforms[i].width && gameChar_y == platforms[i].ypos){ 
            platforms[i].standing = true; 
        } else { 
            platforms[i].standing = false; 
        } 
    } 
}


