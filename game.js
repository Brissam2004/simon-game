const buttonColors=['red','blue',"green",'yellow']
var gamePattern=[]
var userClickedPattern=[]
var level=0;

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function nextSequence() {
    userClickedPattern=[];

    level+=1;

    var randomNumber=Math.floor((Math.random())*4)
    var randomChosenColor=buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
    $("h1").text("Level "+(level-1))
    
}

$(".btn").click(function () {
    var userChosenColor=$(this).attr('id')
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        

        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            },1000)
        }
    }
    else if(userClickedPattern[currentLevel]!==gamePattern[currentLevel]){
        var gameOver=new Audio("sounds/wrong.mp3");
        gameOver.play();

        $('body').addClass("game-over")
        setTimeout(function () {
            $("body").removeClass('game-over')
        },200)

        $("h1").text('Game over.Press a key to restart')

        startOver()
    }
        
        
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed')
    setTimeout(function () {
        
    $("#" + currentColor).removeClass('pressed')

    },100)
}

function startOver() {
    level=0;
    gamePattern=[];
    
}



$('body').keypress(function () {
    
    nextSequence()
})







