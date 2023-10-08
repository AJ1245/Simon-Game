var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

function nextsequence(){
    var random=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[random];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;  
    $("h1").text("Level "+level); 

}

$(".btn").click(function(event){
    var userChosenColor=event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatepress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

      

});

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();   
}

function animatepress(currentcolor){
    $('#'+currentcolor).addClass("pressed");
    setTimeout(function(){
        $('#'+currentcolor).removeClass("pressed");
    },100)
}

$(document).keypress(function(){
    if (started===false){
        started=true
        $("h1").text("Level "+level);
        nextsequence();
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextsequence();
                userClickedPattern=[];
            }   ,1000);    
            
        }

        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
     
    }


}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[]
}