const button = $(".btn");
let game = false;
let sequenceDisplaying = false;
let level = 0;

const arrayBtn = ["red", "yellow", "green", "blue"];
let randomOrder = [];
let userOrder = [];


button.click(function () {
    if (!sequenceDisplaying) {

        let chosenColor = $(this).attr("id");

        visualEffects(chosenColor);
        soundEffects(chosenColor);

        userOrder.push(chosenColor);
        compareOrders(userOrder.length - 1);
    }
});

$(".title").click(function () {

    if (!game) {
        $(".title").text("Level " + level);
        randomGenerator();

        game = true;
    }

});

function compareOrders(level) {

    if (userOrder[level] === randomOrder[level]) {

        if (userOrder.length == randomOrder.length) {
            showRandomOrder();

        }

    } else {

        gameOver();

    }

}

function randomGenerator() {

    level++;
    $(".title").text("Level: " + level);
    userOrder = [];

    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = arrayBtn[randomNum];

    randomOrder.push(randomColor);

    visualEffects(randomColor);
    soundEffects(randomColor);

}

function visualEffects(color) {

    $("#" + color).addClass(color + "-active");
    setTimeout(function () {
        $("#" + color).removeClass(color + "-active");
    }, 100);

}

function soundEffects(color) {

    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

}

function gameOver() {

    soundEffects("over");
    $(".title").text("GAME OVER");
    $("body").css("background-color", "red");

    setTimeout(function () {
        $(".title").text("START");
        $("body").css("background-color", "#343a40");
        newGame();
    }, 2000);

}

function newGame() {

    game = false;
    randomOrder = [];
    userOrder = [];
    level = 0;

}


function showRandomOrder() {
    
    sequenceDisplaying = true;
    let i = 0;
    const interval = setInterval(function () {
        visualEffects(randomOrder[i]);
        soundEffects(randomOrder[i]);
        i++;
        if (i >= randomOrder.length) {
            clearInterval(interval);
            setTimeout(function () {
                randomGenerator();
                sequenceDisplaying = false;
            }, 500);
        }
    }, 500);
    
}
