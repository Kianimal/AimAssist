function game(gameNum){

  let gameCount = gameNum;
  let gameOverStatus = false;
  let moveTimer;

  let container = document.getElementById("container");
  let square = document.getElementById("animation");
  let button = document.getElementById("startBtnWrap");

  let moveFreq = 30;

  function start(){
    //Remove button
    button.parentNode.removeChild(button);
  
    //Render animated object
    square.style.visibility = "visible";
  
    function runIntro(){
  
      //Instruction step counter
      let step = 0;
  
      let introTextTopArray = ['<div class="fade-in"><p id="introTop">Place your cursor on the <span class="yellowHighlight">square</span> below</p></div>',
                                '<div class="fade-in"><br><p id="introTop">GREAT!</p></div>',
                                '<div class="fade-in"><br><p id="introTop">We\'ll start off slow</p></div>',
                                '<div class="fade-in"><br><p id="introTop">GOT IT?</p></div>'];
      let introTextBottomArray = ['<div class="fade-in"><p id="arrow" class="yellowHighlight">↑</p><p id="introBottom"><span class="red">HINT!</span> IT\'S RIGHT HERE</p></div>',
                                  '<br><br><br><br><div class="fade-in"><p id="introBottom">NOW <span class="red">KEEP</span> IT THERE!</p></div>',
                                  '<br><br><br><br><div class="fade-in"><p id="introBottom">TRACK THE <span class="red">BOX</span> WITH YOUR CURSOR!</p></div>',
                                  '<br><br><br><br><div class="fade-in"><p id="introBottom">I <span class="yellow">HOPE</span> SO, BECAUSE IT GETS <span class="red">FASTER</span>!</p></div>'];
  
      let splash = document.getElementById("splashWrap");
      let introDivTop = document.createElement("div");
      let introDivBottom = document.createElement("div");
  
      splash.parentNode.removeChild(splash);
      introDivTop.setAttribute('id','introWrap');
    
      container.prepend(introDivTop);
      container.append(introDivBottom);
    
      introDivBottom.setAttribute('id','introWrapBottom');
  
      displayIntro();
    
      function displayIntro(){
  
        function revealBottomText(text,timer){
          introDivBottom.innerHTML = text;
          clearTimeout(timer);
        }
  
        function appendIntroText(){
          introTextTop = introTextTopArray[step];
          introTextBottom = introTextBottomArray[step];
          introDivTop.innerHTML = introTextTop;
          introDivBottom.innerHTML = "";
          bottomTextTimer = setTimeout(function(){revealBottomText(introTextBottom,bottomTextTimer)},3000);
        }
  
        if(step===0){
          square.addEventListener("mouseover", displayIntro);
        }
  
        if(step===1){
          square.removeEventListener("mouseover", displayIntro);
          displayTimer = setTimeout(function(){displayIntro();},7000);
        }
  
        if(step===2){
          clearTimeout(displayTimer);
          demoMode();
          var demoTimer = setTimeout(function(){displayIntro();},10000);
        }
  
        if(step===(3)){
          clearTimeout(demoTimer);
          let countdownId = setTimeout(function(){countdown(countdownId)},6000);
        }
  
        appendIntroText();
        step++;
  
      }
    
    }
  
    //Run intro function
    runIntro();
  }
  
//Countdown timer to begin the game
  //Allows user to place their cursor appropriately before starting
  function countdown(timerId){

    let countdownId = timerId;
    clearInterval(countdownId);

    if(gameCount<1){
      let introDivTop = document.getElementById("introTop");
      let introDivBottom = document.getElementById("introBottom");
    
      introDivTop.parentNode.removeChild(introDivTop);
      introDivBottom.parentNode.removeChild(introDivBottom);

      let introWrap = document.getElementById("introWrap");
      let introWrapBottom = document.getElementById("introWrapBottom");

      introWrap.parentNode.removeChild(introWrap);
      introWrapBottom.parentNode.removeChild(introWrapBottom);
    }
  
    let counter = 3;
    let countdownDiv = document.createElement("div");
    let count = document.createTextNode(counter);
    countdownDiv.setAttribute("id","countdown");
    countdownDiv.appendChild(count);
    container.prepend(countdownDiv);
  
    let clearDiv = () => {
      let countdownDiv = document.getElementById("countdown");
      countdownDiv.parentNode.removeChild(countdownDiv);
    }
  
    let changeCountdownText = () => {
      counter--;
      if(counter == 0){
        counter = 'GO<span class="yellow">!</span>';
        setTimeout(function(){clearDiv()},1000);
        setTimeout(function(){move()},1100);
        clearInterval(id);
      }
      countdownDiv.innerHTML = counter;
    }
  
    let id = setInterval(function(){changeCountdownText();},1000);
  
  }

  function demoMode() {
  
    let horizontalPos = 360;
    let verticalPos = 360;
    let minHorizontalPos = 305;
    let minVerticalPos = 305;
    let maxHorizontalPos = 415;
    let maxVerticalPos = 415;
    let resetHorizontal = 360;
    let resetVertical = 360;
    var reset = false;
  
    setTimeout(function(){demoReset()},8000);
  
    function demoReset() {
      horizontalTarget = resetHorizontal;
      verticalTarget = resetVertical;
      reset=true;
    }
  
    const randomFrameTarget = (targetType) => {
      if(targetType == "horizontal"){
        target = Math.round(Math.random()*maxHorizontalPos);
        if(target == horizontalPos || target < minHorizontalPos){
          randomFrameTarget("horizontal");
        }
      }
      else if (targetType == "vertical") {
        target = Math.round(Math.random()*maxVerticalPos);
        if(target == verticalPos || target < minVerticalPos){
          randomFrameTarget("vertical");
        }
      }
      return target;
    }
  
    function setFrameInterval(moveTimer,horizontalTarget,verticalTarget){
      return moveTimer = setInterval(function() {frame(moveTimer,horizontalTarget,verticalTarget);}, 50);
    }
  
    function frame(moveTimer,horizontalTarget,verticalTarget){
      //If reset is active, return to center
      if(reset){
        if(square.style.left==(resetHorizontal+'px')){
          if(square.style.top==(resetVertical+'px')){
            clearInterval(moveTimer);
          }
          if(verticalPos > resetVertical) {
            verticalPos--;
            square.style.top = verticalPos + 'px';
          }
          if(verticalPos < resetVertical) {
            verticalPos++;
            square.style.top = verticalPos + 'px';
          }
          clearInterval(moveTimer);
          moveTimer = setFrameInterval(moveTimer,resetHorizontal,resetVertical);
        }
        if (horizontalPos > resetHorizontal){
          if(verticalPos > resetVertical) {
            verticalPos--;
            square.style.top = verticalPos + 'px';
          }
          if(verticalPos < resetVertical) {
            verticalPos++;
            square.style.top = verticalPos + 'px';
          }
          horizontalPos--;
          square.style.left = horizontalPos + 'px';
        }
        if (horizontalPos < resetHorizontal){
          if(verticalPos > resetVertical) {
            verticalPos--;
            square.style.top = verticalPos + 'px';
          }
          if(verticalPos < resetVertical) {
            verticalPos++;
            square.style.top = verticalPos + 'px';
          }
          horizontalPos++;
          square.style.left = horizontalPos + 'px';
        }
      }
      //If horizontal target is reached
      else if (horizontalPos == horizontalTarget) {
  
        //If both targets are reached
        if(verticalPos == verticalTarget){
          clearInterval(moveTimer);
          //Reset both targets
          horizontalTarget = randomFrameTarget("horizontal");
          verticalTarget = randomFrameTarget("vertical");
          moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
        }
  
        clearInterval(moveTimer);
        //Reset horizontal target
        horizontalTarget = randomFrameTarget("horizontal");
        moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
      }
  
      //If vertical target is reached
      else if (verticalPos == verticalTarget) {
        clearInterval(moveTimer);
        //Reset vertical target
        verticalTarget = randomFrameTarget("vertical");
        moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
      }
  
      //If neither target is reached, adjust both positions (starting with horizontal) 
        //Use current position and targets to determine direction/increment.
      else if (horizontalPos > horizontalTarget){
        if(verticalPos > verticalTarget) {
          verticalPos--;
          square.style.top = verticalPos + 'px';
        }
        if(verticalPos < verticalTarget) {
          verticalPos++;
          square.style.top = verticalPos + 'px';
        }
        horizontalPos--;
        console.log();
        square.style.left = horizontalPos + 'px';
      }
  
      else if (horizontalPos < horizontalTarget){
        if(verticalPos > verticalTarget) {
          verticalPos--;
          square.style.top = verticalPos + 'px';
        }
        if(verticalPos < verticalTarget) {
          verticalPos++;
          square.style.top = verticalPos + 'px';
        }
        horizontalPos++;
        square.style.left = horizontalPos + 'px';
      }
      
    }
  
    function startMovement(){
      // //Generate frame targets and start animation  
      let horizontalTarget = randomFrameTarget("horizontal");
      let verticalTarget = randomFrameTarget("vertical");
      moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
      // var demoResetTimer = setTimeout(function(){demoRe(id);},15000);
  
    }
  
    startMovement();
  
  }
  
  function move() {
  
    let horizontalPos = 360;
    let verticalPos = 360;
    let minHorizontalPos = 5;
    let minVerticalPos = 5;
    let maxHorizontalPos = 715;
    let maxVerticalPos = 715;
  
    const randomFrameTarget = (targetType) => {
      if(targetType == "horizontal"){
        target = Math.round(Math.random()*maxHorizontalPos);
        if(target == horizontalPos || target < minHorizontalPos){
          randomFrameTarget("horizontal");
        }
      }
      else if (targetType == "vertical") {
        target = Math.round(Math.random()*maxVerticalPos);
        if(target == verticalPos || target < minVerticalPos){
          randomFrameTarget("vertical");
        }
      }
      return target;
    }
  
    function setFrameInterval(moveTimer,horizontalTarget,verticalTarget){
      if(gameOverStatus){
        clearInterval(moveTimer);
      }
      else{
        let newMoveFreq = moveFreq;
        return moveTimer = setInterval(function() {frame(moveTimer,horizontalTarget,verticalTarget);}, newMoveFreq);
      }
    }
  
    function frame(moveTimer,horizontalTarget,verticalTarget){

      if(gameOverStatus){
        clearInterval(moveTimer);
      }
      
      //If horizontal target is reached
      if (horizontalPos == horizontalTarget) {
  
        //If both targets are reached
        if(verticalPos == verticalTarget){
          clearInterval(moveTimer);
          //Reset both targets
          horizontalTarget = randomFrameTarget("horizontal");
          verticalTarget = randomFrameTarget("vertical");
          moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
        }
  
        clearInterval(moveTimer);
        //Reset horizontal target
        horizontalTarget = randomFrameTarget("horizontal");
        moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
      }
  
      //If vertical target is reached
      else if (verticalPos == verticalTarget) {
        clearInterval(moveTimer);
        //Reset vertical target
        verticalTarget = randomFrameTarget("vertical");
        moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
      }
  
      //If neither target is reached, adjust both positions (starting with horizontal) 
        //Use current position and targets to determine direction/increment.
      if (horizontalPos > horizontalTarget){
        if(verticalPos > verticalTarget) {
          verticalPos--;
          square.style.top = verticalPos + 'px';
        }
        if(verticalPos < verticalTarget) {
          verticalPos++;
          square.style.top = verticalPos + 'px';
        }
        horizontalPos--;
        console.log();
        square.style.left = horizontalPos + 'px';
      }
  
      else if (horizontalPos < horizontalTarget){
        if(verticalPos > verticalTarget) {
          verticalPos--;
          square.style.top = verticalPos + 'px';
        }
        if(verticalPos < verticalTarget) {
          verticalPos++;
          square.style.top = verticalPos + 'px';
        }
        horizontalPos++;
        square.style.left = horizontalPos + 'px';
      }
  
    }
  
    function startMovement(){
      // //Generate frame targets and start animation  
      let horizontalTarget = randomFrameTarget("horizontal");
      let verticalTarget = randomFrameTarget("vertical");
      moveTimer = setFrameInterval(moveTimer,horizontalTarget,verticalTarget);
      console.log("Move freq: " + moveFreq);
      score();
    }
  
    startMovement();
  
  }
  
  function score(){
    let stepUp = 0;
    let stepDown = 0;
    let scoreVal = 0;
    let multiplier = 1;
    let scoreTimer = setInterval(function(){checkScoringStatus();},1);
    let scoreWrap = document.createElement("div");
    scoreWrap.classList.add("scoreBox");
    scoreWrap.innerHTML = '<p>SCORE: ' + scoreVal + ' <span id="multi">x <span class="yellow">' + multiplier + '</span></span></p>';
    container.append(scoreWrap);
  
    function getHoverState(square){
      if(!square.matches(":hover")){
        return false;
      }
      else{
        return true;
      }
    }
  
    let decreaseMultiplier = () => {
      stepDown++;
      if((stepDown%250)==0){
        if(stepDown==750){
          if(moveFreq<50){
            moveFreq+=2;
          }
          stepDown=0;
          container.removeChild(scoreWrap);
          gameOver(scoreTimer,scoreVal,multiplier);
        }
        else if(multiplier>1){
          multiplier--;
        }
        else{
          multiplier = 1;
        }
        updateScore(scoreVal,multiplier);
      }
    }
  
    const checkScoringStatus = () => {
      let isHovered = getHoverState(square);
  
      if(isHovered){
        stepDown=0;
        stepUp++;
        if((stepUp%250)==0){
          scoreVal+=1;
          if(stepUp==1250){
            if(moveFreq>2){
              moveFreq-=2;
            }
            stepUp=0;
            multiplier++;
          }
          updateScore(scoreVal,multiplier);
        }
      }
      else{
        stepUp=0;
        decreaseMultiplier();
      }
    }
  
    const updateScore = (score, multi) => {
      scoreWrap.innerHTML = '<p>SCORE: ' + score + ' <span id="multi">x <span class="yellow">' + multi + '</span></span></p>';
    }
  }
  
  function gameOver(scoreTimer,scoreVal,multiplier){
    clearInterval(scoreTimer);

    gameOverStatus = true;
    gameCount++;
  
    let gameOverWrap = document.createElement("div");
    let scoreWrap = document.createElement("div");
    let startBtnWrap = document.createElement("div");
  
    let totalScore = scoreVal*multiplier;
  
    square.style.visibility = "hidden";
    gameOverWrap.setAttribute("id","gameOverWrap");
    scoreWrap.setAttribute("id","scoreWrap");
    startBtnWrap.setAttribute("id","startBtnWrap");
  
    gameOverWrap.innerHTML = '<p>GAME OVER<p>';
    scoreWrap.innerHTML = '<p><span class="red">SCORE</span>:</p><p>' + scoreVal + ' x ' + multiplier + ' = <span class="yellow">' + totalScore + '</span></p>';
    startBtnWrap.innerHTML = '<div id="startBtn" onclick="game('+ gameCount +')"><p id="startTxt">PLΛY</p></div></div>';
  
    gameOverWrap.append(scoreWrap);
    container.append(gameOverWrap);
    container.append(startBtnWrap);
  }
  
  function restartGame(){
    square.style.top = '360px';
    square.style.left = '360px';
    gameOverStatus = false;
    let gameOverWrap = document.getElementById("gameOverWrap");
    let scoreWrap = document.getElementById("scoreWrap");
    gameOverWrap.parentNode.removeChild(gameOverWrap);
    scoreWrap.parentNode.removeChild(scoreWrap);
  
    let button = document.getElementById("startBtnWrap");
    button.parentNode.removeChild(button);
  
    //Render animated object
    square.style.visibility = "visible";
  
    let countdownId = setTimeout(function(){countdown(countdownId)},10);

  }

  if(gameCount<1){
    console.log(gameCount);
    start();
  }
  else{
    console.log(gameCount);
    restartGame();
  }

}