var a=["red","blue","yellow","green"]
var pattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$("body").keypress(function(){
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }

});

$(".btn").click(function(e){
    if(started){
        var userChosenColour=e.target.id;
        userClickedPattern.push(userChosenColour);
        this.classList.add("pressed");
        var re=this.classList;
        setTimeout(function(){
            re.remove("pressed");
        },100);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});






// FUnctions 

// Generating the Sequence 
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randNo=Math.floor(Math.random()*4);
    var randomChosenColour=a[randNo];
    pattern.push(a[randNo]);
    $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    playSound(randomChosenColour);
}

// Button click function
function onClick(e){
    var userChosenColour=e.target.id;
    userClickedPattern.push(userChosenColour);
    this.classList.add("pressed");
    var re=this.classList;
    setTimeout(function(){
        re.remove("pressed");
    },100);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

// Button Sounds on Press and NextSequence()
function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
    
}
 
// Checking the Answer
function checkAnswer(currentLevel){
    if (pattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("Success");
        if (pattern.length===userClickedPattern.length) {
            setTimeout(nextSequence(),1000);
        
        }
    }
    else{
        console.log("Wrong");
        var wrong= new Audio("sounds/wrong.mp3")
        wrong.play();
        gameOver();
    }

}

// GameOver
function gameOver(){
        pattern=[];
        userClickedPattern=[];
        level=0;
        started=false;
        $("#level-title").text("Game over, press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
}