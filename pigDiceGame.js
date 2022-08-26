let playerOne = true

let scorePlayerOne = 0;
let scorePlayerTwo = 0;

$("#rules ul").hide();
$("#rules").on("click", function(){ 
    $("#rules ul").fadeToggle(function(){
        if($("#rules ul").is(":visible")){
            $("#rules i").attr("class", "fa-solid fa-minus")
        }
        else{
            $("#rules i").attr("class", "fa-solid fa-plus")
        }
    });
});

$("#start-again-button").on("click", function(){
    $("#button-game button").attr("disabled", false);
    $("#score span").hide();
    scorePlayerOne = 0;
    $("#score-1").html(scorePlayerOne);
    scorePlayerTwo = 0;
    $("#score-2").html(scorePlayerTwo);
});

function winner(){
    if(scorePlayerOne >= 100){
        $("#button-game button").attr("disabled", true);
        $("#score #winner-1").fadeIn(500);
    }
    else if(scorePlayerTwo >= 100){
        $("#button-game button").attr("disabled", true);
        $("#score #winner-2").fadeIn(500);
    }
}

function passTurn(){
    $("#pass-turn").on("click", function(){
        if(playerOne == true){
            playerTwoTurn()
            playerOne = false;
        }
        else{
            playerOneTurn()
            playerOne = true;
        }
    });
}

function playerOneTurn(){
    $("#players #player-one").css("color", "red");
    $("#players #player-two").css("color", "black");
}

function playerTwoTurn(){
    $("#players #player-one").css("color", "black");
    $("#players #player-two").css("color", "red");
}

function gameLogic(){
    $("#roll-dice").on("click", function(){
        let diceOne = (Math.floor(Math.random() * 6 + 1));
        let diceTwo = (Math.floor(Math.random() * 6 + 1));

        $("#random-1 img").attr("src", `img/dice_${diceOne}.png`);
        $("#random-2 img").attr("src", `img/dice_${diceTwo}.png`);

        if(diceOne != 1 && diceTwo != 1){
            let sumNum = diceOne + diceTwo;
            if(playerOne == true){
                playerOneTurn();
                scorePlayerOne += sumNum;
                $("#score-1").html(scorePlayerOne);
                winner();
            }
            else{
                playerTwoTurn();
                scorePlayerTwo += sumNum;
                $("#score-2").html(scorePlayerTwo); 
                winner();
            }
        }

        else if(diceOne == 1 && diceTwo == 1){
            if(playerOne == true){
                scorePlayerOne = 0;
                playerOne = false;
                $("#score-1").html(scorePlayerOne);
                playerTwoTurn();
            }
            else{
                scorePlayerTwo = 0
                playerOne = true
                $("#score-2").html(scorePlayerTwo);
                playerOneTurn();
            }

            setTimeout(function(){
                $("#ouch").fadeIn(200, function(){
                    $("#ouch").css("display", "block")
                    $("#ouch").fadeOut(200);
                });
            }, 0);

        }

        else{
            if(playerOne == true){
                playerOne = false;
                playerTwoTurn();
            }
            else{
                playerOne = true;
                playerOneTurn();
            }
        }
    });
}

gameLogic();
passTurn();